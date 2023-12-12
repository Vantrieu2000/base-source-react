import {
  DownloadOutlined,
  EditOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Empty, Modal } from 'antd';
import Search from 'antd/lib/input/Search';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import AuthorizedElement from '../../components/permission/PermissionGuardElement';
import CustomSelect from '../../components/select/CustomSelect';
import { api, ResponseError } from '../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../utils/api/responseHandler';
import { DEFAULT_NO_IMAGE } from '../../utils/constants';
import { GetListMenuDto } from '../../utils/dto/menu.dto';
import { addKey, convertDataToObjectArray } from '../../utils/functions/common';
import { ConfirmAction } from '../../utils/functions/confirmModal';
import AddToCategory from './components/AddToCategory';
import ModalSelectCategory from './components/ModalSelectCategory';

const buttonStyle: React.CSSProperties = {
  flex: 1,
  borderRadius: 6,
};

export const MenuSetting = (props: WrappedComponentProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<any>(null);
  const [dataMenu, setDataMenu] = useState<any>();
  const store_id = localStorage.getItem('store_id') as string;
  const [page, setPage] = useState<'list' | 'add'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<GetListMenuDto>({
    storeId: '',
    categoryId: '',
    categoryName: '',
    search: '',
    limit: 10,
  });

  // Get list category
  const { data, status } = useQuery(
    ['category-list', store_id],
    () => api.Category.getListCategory(store_id!),
    {
      onSuccess(data) {
        if (data) {
          setSelectedCategory(data[0]?.name);
          setFilter({
            storeId: store_id,
            categoryId: data[0]?._id, // it is it but transfer is name, don't ask me why, i don't know
            categoryName: data[0]?.name, // it is it but transfer is name, don't ask me why, i don't know
            search: '',
            limit: 10,
          });
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  // Get list menu by category
  const { data: listMenu, status: statusListMenu } = useQuery(
    ['menu-list', filter],
    () => api.Menu.getListMenuByCategory(filter!),
    {
      onSuccess(data) {
        if (data) {
          setDataMenu(data.map(addKey));
        }
      },
      select(data) {
        return data.map(addKey);
      },
      refetchOnWindowFocus: false,
      enabled: !!selectedCategory,
    }
  );

  //Create Menus
  const { mutate: CreateMenu, status: statusCreateMenu } = useMutation(
    api.Menu.createMenu,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          window.location.reload();
          queryClient.invalidateQueries(['menu-list', filter]);
        } else {
          CustomHandleError(
            {
              statusCode: data.status,
              message: data.message,
              error: 'Error',
            },
            intl
          );
        }
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );
  //Copy Menus
  const { mutate: CopyMenu, status: statusCopyMenu } = useMutation(
    api.Menu.copyMenu,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          window.location.reload();
          queryClient.invalidateQueries(['menu-list', filter]);
        } else {
          CustomHandleError(
            {
              statusCode: data.status,
              message: data.message,
              error: 'Error',
            },
            intl
          );
        }
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  //------------- Delete menus ---------------//
  const { mutate: DeleteMenu, status: statusDeleteMenu } = useMutation(
    api.Menu.deleteMenu,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          window.location.reload();
          queryClient.invalidateQueries(['menu-list', filter]);
        } else {
          console.log('FAIL', data);
        }
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  //------------- ReOrder menu ---------------//\
  const { mutate: ReOrderMenu, status: statusReOrderMenu } = useMutation(
    api.Menu.reOrderMenu,
    {
      onSuccess: (data) => {
        CustomHandleSuccess(data.status, intl);
        queryClient.invalidateQueries(['menu-list', filter]);
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  //------------- Sort menu ------------------//

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      listMenu,
      result.source.index,
      result.destination.index
    );

    ReOrderMenu({
      id: result.draggableId,
      newOrder: result.destination.index + 1,
    });

    setDataMenu(items);
  };

  //------------- Upload data from excel file ------------------//

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) handleFile(files[0]);
  };

  const handleNewFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFile = (file /*:File*/) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e: any) => {
      const bstr = e.target.result;

      try {
      } catch (error) {
        console.error('Error reading file:', error);
      }
      const workbook = XLSX?.read(bstr, { type: rABS ? 'binary' : 'array' });

      const sheetname = workbook?.SheetNames[0];
      const sheet = workbook?.Sheets[sheetname];

      if (!sheet) {
        console.error('Sheet does not exist.');
        return;
      }

      const data = convertDataToObjectArray(
        XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false })
      );

      const validateData = (data: any[]): boolean => {
        return data.every(
          (item) => item.name !== undefined && item.price !== undefined
        );
      };

      const isValidate = validateData(data);

      if (isValidate) {
        Modal.confirm({
          title: 'Conform create Menu by Excel file',
          content: `Are you sure to create ${data?.length} menu from Excel file`,
          okText: intl.formatMessage({ id: 'system.yes' }),
          cancelText: intl.formatMessage({ id: 'system.cancel' }),
          onOk: () => {
            const dataSubmit = {
              menuItems: data.map((item) => ({
                ...item,
                storeId: store_id,
                price: [{ price: item.price, size: item?.size }],
              })),
            };

            CreateMenu(dataSubmit as any);
          },
        });
      } else {
        Modal.warning({
          title: 'Validation',
          content: 'Validation',
          okText: intl.formatMessage({ id: 'system.yes' }),
        });
      }
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const getCategoryByName = (name: string) => {
    return data?.find((item) => item.name === name);
  };

  //------------------ COPY MENU -------------------------------//

  const handleCheckboxChange = (itemId) => {
    const updatedData = dataMenu.map((item) =>
      item._id === itemId ? { ...item, checked: !item.checked } : item
    );
    setDataMenu(updatedData);
  };

  const handleClickCopy = () => {
    const selectedItems = dataMenu?.filter((item) => item.checked);

    if (selectedItems?.length > 0) {
      ConfirmAction(
        {
          onOk: () => {
            handleCopy();
          },
          onCancel: () => {},
        },
        intl,
        {
          title: intl.formatMessage({ id: 'modal.confirm.copy-menu.title' }),
          content: intl.formatMessage({ id: 'modal.confirm.copy-menu.text' }),
          okText: intl.formatMessage({ id: 'system.copy' }),
          cancelText: intl.formatMessage({ id: 'system.cancel' }),
        }
      );
    } else {
      Modal.warning({
        title: intl.formatMessage({
          id: 'modal.register-warning.no-item.title',
        }),
        content: intl.formatMessage({
          id: 'modal.register-warning.no-item.content',
        }),
        okText: intl.formatMessage({ id: 'system.ok' }),
      });
    }
  };

  const handleCopy = () => {
    const selectedItems = dataMenu.filter((item) => item.checked);

    const newData: any = [];
    selectedItems.forEach((selectedItem) => {
      const copyItem = { ...selectedItem };
      copyItem._id = Math.random().toString();
      copyItem.checked = false;
      copyItem.id = copyItem._id;
      delete copyItem._id;
      newData.push(copyItem);
    });

    CopyMenu({
      menuItems: newData,
    } as any);
  };

  //------------------ MOVE MENU ----------------------------//

  const handleClickMove = () => {
    const selectedItems = dataMenu?.filter((item) => item.checked);

    if (selectedItems?.length > 0) {
      setShowModal(true);
    } else {
      Modal.warning({
        title: intl.formatMessage({
          id: 'modal.register-warning.no-item.title',
        }),
        content: intl.formatMessage({
          id: 'modal.register-warning.no-item.content',
        }),
        okText: intl.formatMessage({ id: 'system.ok' }),
      });
    }
  };

  //------------------- DELETE MENU --------------------------//

  const handleClickDelete = () => {
    const selectedItems = dataMenu?.filter((item) => item.checked);

    if (selectedItems?.length > 0) {
      Modal.confirm({
        title: intl.formatMessage({ id: 'modal.confirm.delete-staff.title' }),
        content: intl.formatMessage({
          id: 'modal.confirm.delete-staff.content',
        }),
        okText: intl.formatMessage({ id: 'system.delete' }),
        cancelText: intl.formatMessage({ id: 'system.cancel' }),
        onOk: () => {
          handleDeteteMenu();
        },
        onCancel: () => {},
      });
    } else {
      Modal.warning({
        title: intl.formatMessage({
          id: 'modal.register-warning.no-item.title',
        }),
        content: intl.formatMessage({
          id: 'modal.register-warning.no-item.content',
        }),
        okText: intl.formatMessage({ id: 'system.ok' }),
      });
    }
  };

  const handleDeteteMenu = () => {
    const selectedItems = dataMenu.filter((item) => item.checked);

    const payload = selectedItems.map((item) => ({
      storeId: store_id,
      id: item._id,
    }));

    if (payload.length > 0) {
      const dataSubmit = {
        menuItems: payload,
      };

      DeleteMenu(dataSubmit as any);
    } else {
      Modal.warning({
        title: intl.formatMessage({
          id: 'modal.register-warning.no-item.title',
        }),
        content: intl.formatMessage({
          id: 'modal.register-warning.no-item.content',
        }),
        okText: intl.formatMessage({ id: 'system.ok' }),
      });
    }
  };

  // ----------------------------------------------------//
  const handleChangeCategory = (e) => {
    setSelectedCategory(e);
    setFilter({
      ...filter,
      categoryName: e,
      categoryId: getCategoryByName(e)?._id,
    });
  };

  const onSearch = (value, _e, info) => {
    setFilter({
      ...filter,
      search: value,
    });
  };

  return (
    <div className="menu-setting" id="menu-setting">
      <ModalSelectCategory
        visible={showModal}
        setVisible={setShowModal}
        selectedItem={dataMenu?.filter((item) => item.checked)}
      />
      {page === 'list' ? (
        <div className="menu-setting__container">
          <div className="menu-setting__container__title">
            {intl.formatMessage({ id: 'pages.menu-setting.title' })}
          </div>
          <div className="menu-setting__container__content row">
            <div className="col-xs-6 col-md-4 menu-setting__container__content__list">
              <div className="menu-setting__container__content__list__category">
                <div className="menu-setting__container__content__list__category__title">
                  {intl.formatMessage({
                    id: 'pages.menu-setting.list.category',
                  })}
                </div>
                <div className="menu-setting__container__content__list__category__select">
                  <CustomSelect
                    options={data?.map((item: any) => ({
                      label: item.name,
                      value: item.name,
                    }))}
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                  />
                </div>
              </div>
              <div className="d-flex flex-column gap-4">
                <div className="menu-setting__container__content__list__upload">
                  <div className="menu-setting__container__content__list__upload__title">
                    {intl.formatMessage({
                      id: 'pages.menu-setting.list.download.title',
                    })}
                  </div>
                  <div className="menu-setting__container__content__list__upload__des">
                    {intl.formatMessage({
                      id: 'pages.menu-setting.list.download.des',
                    })}
                  </div>
                  <div className="menu-setting__container__content__list__upload">
                    <a
                      href="/assets/files/FILE.xlsx"
                      download="excel_template.xlsx"
                    >
                      <Button
                        className="d-flex"
                        type="primary"
                        icon={<DownloadOutlined />}
                      >
                        {intl.formatMessage({
                          id: 'pages.menu-setting.list.download.text',
                        })}
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="menu-setting__container__content__list__upload">
                  <div className="menu-setting__container__content__list__upload__title">
                    {intl.formatMessage({
                      id: 'pages.menu-setting.list.upload.title',
                    })}
                  </div>
                  <div className="menu-setting__container__content__list__upload__des">
                    {intl.formatMessage({
                      id: 'pages.menu-setting.list.upload.des',
                    })}
                  </div>
                  <div className="menu-setting__container__content__list__upload">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="form-control"
                      id="file"
                      accept=".xls, .xlsx"
                      onClick={handleNewFileSelection}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-8 menu-setting__container__content__detail">
              <div className="menu-setting__container__content__detail__header">
                <div className="menu-setting__container__content__detail__header__title">
                  {intl.formatMessage({
                    id: 'pages.menu-setting.content.header.title',
                  })}
                </div>
                <div className="menu-setting__container__content__detail__header__action">
                  <Button
                    style={buttonStyle}
                    type="primary"
                    onClick={() => {
                      setPage('add');
                    }}
                  >
                    {intl.formatMessage({
                      id: 'system.add',
                    })}
                  </Button>
                  <Button
                    style={buttonStyle}
                    type="default"
                    onClick={handleClickCopy}
                  >
                    {intl.formatMessage({
                      id: 'system.copy',
                    })}
                  </Button>
                  <Button
                    style={buttonStyle}
                    type="default"
                    onClick={handleClickMove}
                  >
                    {intl.formatMessage({
                      id: 'system.move',
                    })}
                  </Button>
                  <AuthorizedElement>
                    <Button
                      style={buttonStyle}
                      type="primary"
                      danger
                      onClick={handleClickDelete}
                    >
                      {intl.formatMessage({
                        id: 'system.delete',
                      })}
                    </Button>
                  </AuthorizedElement>
                </div>
              </div>
              <div className="menu-setting__container__content__detail__search">
                <Search
                  placeholder="Search here"
                  allowClear
                  enterButton
                  size="large"
                  // onSearch={onSearch}
                />
              </div>
              <div className="menu-setting__container__content__detail__content">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="d-flex flex-column gap-2"
                      >
                        {dataMenu?.length > 0 ? (
                          dataMenu?.map((item, index) => (
                            <Draggable
                              key={item.key}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className={clsx(`menu-setting__item`)}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  onClick={() => {}}
                                >
                                  <div className="menu-setting__item__head">
                                    <div className="menu-setting__item__head__checkbox">
                                      <Checkbox
                                        onChange={() =>
                                          handleCheckboxChange(item._id)
                                        }
                                      />
                                    </div>
                                    <div
                                      className="menu-setting__item__head__drag"
                                      {...provided.dragHandleProps}
                                    >
                                      <HolderOutlined
                                        style={{ fontSize: '24px' }}
                                      />
                                    </div>
                                    <div className="menu-setting__item__head__image">
                                      <img
                                        src={item?.photo}
                                        onError={(e) => {
                                          e.currentTarget.onerror = null;
                                          e.currentTarget.src =
                                            DEFAULT_NO_IMAGE;
                                        }}
                                        alt=""
                                      />
                                    </div>
                                    <div className="menu-setting__item__head__name">
                                      {item.name}
                                    </div>
                                  </div>
                                  <div className="menu-setting__item__tail">
                                    <div className="menu-setting__item__tail__price d-flex flex-column">
                                      {item?.price?.map((item: any, index) => {
                                        return (
                                          <div className="">
                                            {item?.size && (
                                              <>Size : {item?.size} - </>
                                            )}
                                            Price : {item?.price}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="menu-setting__item__tail__edit">
                                      <Link
                                        to={`/menu-setting/edit-menu/${
                                          item._id
                                        }?categoryId=${
                                          getCategoryByName(selectedCategory)
                                            ._id
                                        }`}
                                      >
                                        <EditOutlined
                                          style={{ fontSize: '24px' }}
                                          onClick={() => {}}
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <Empty />
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AddToCategory
          category={getCategoryByName(selectedCategory)}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default injectIntl(MenuSetting);
