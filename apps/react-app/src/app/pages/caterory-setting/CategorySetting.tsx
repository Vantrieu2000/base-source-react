import { DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../../components/button/SubmitButton';
import CustomInput from '../../components/input/CustomInput';
import { LoadingScreen } from '../../components/loading/LoadingScreen';
import AuthorizedElement from '../../components/permission/PermissionGuardElement';
import { api, ResponseError } from '../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../utils/api/responseHandler';
import { handleChangeForm } from '../../utils/functions/common';
import { ConfirmAction } from '../../utils/functions/confirmModal';

export const CategorySetting = (props: WrappedComponentProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const store_id = localStorage.getItem('store_id');
  const [disableButton, setDisabled] = useState<boolean>(true);
  const [listCategory, setItems] = useState<any>();
  const [selectedId, setSelectedId] = useState<string>('');
  const [actionType, setAction] = useState<'create' | 'update' | ''>('');

  // Get list category
  const { data, status } = useQuery(
    ['category-list', store_id],
    () => api.Category.getListCategory(store_id!),
    {
      onSuccess(data) {
        setItems(data);
      },
      refetchOnWindowFocus: false,
      enabled: !!store_id,
    }
  );

  const { data: DetailCategory, status: statusDetail } = useQuery(
    ['category-detail', selectedId],
    () => api.Category.getDetailCategory({ id: selectedId }),
    {
      onSuccess(data) {
        if (data.status === 200) {
          form.setFieldsValue({
            name: data?.data?.name,
            des: data?.data?.des,
          });
        }
      },
      refetchOnWindowFocus: false,
      enabled: !!selectedId,
    }
  );

  const { mutate: CreateCategory, status: statusCreateCategory } = useMutation(
    api.Category.createCategory,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          reset();
          queryClient.invalidateQueries(['category-list', store_id]);
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

  const { mutate: UpdateCategory, status: statusUpdateCategory } = useMutation(
    api.Category.editCategory,
    {
      onSuccess: (data) => {
        CustomHandleSuccess(data.status, intl);
        reset();
        queryClient.invalidateQueries(['category-list', store_id]);
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  const { mutate: ReOrderCategory, status: statusReOrderCategory } =
    useMutation(api.Category.reOrderCategory, {
      onSuccess: (data) => {
        CustomHandleSuccess(data.status, intl);
        // reset();
        // queryClient.invalidateQueries(["category-list", store_id]);
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    });

  const { mutate: DeleteCategory, status: statusDeleteCategory } = useMutation(
    api.Category.deleteCategory,
    {
      onSuccess: (data) => {
        CustomHandleSuccess(data.status, intl);
        reset();
        queryClient.invalidateQueries(['category-list', store_id]);
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

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
      listCategory,
      result.source.index,
      result.destination.index
    );

    ReOrderCategory({
      id: result.draggableId,
      newOrder: result.destination.index + 1,
    });

    setItems(items);
  };

  const reset = () => {
    form.resetFields();
    setSelectedId('');
    setAction('');
    setDisabled(true);
  };

  const onFinish = (values) => {
    if (actionType === 'create') {
      CreateCategory({ ...values, storeId: store_id });
    } else if (actionType === 'update') {
      UpdateCategory({ ...values, id: selectedId });
    }
  };

  const modalConfirmDeleteCategory = (item) => {
    ConfirmAction(
      {
        onOk: () => {
          if (!item.isTemplate) {
            DeleteCategory({ id: item._id, storeId: store_id! });
          }
        },
        onCancel: () => {},
      },
      intl,
      {
        title: 'Delete',
        content: item.isTemplate
          ? 'This is template item !!!'
          : 'Are you sure you want to delete?',
        okText: 'Confirm',
        cancelText: 'Cancel',
      }
    );
  };

  useEffect(() => {
    const templateItem = {
      _id: '01',
      name: 'Template Item',
      des: 'Template Item Description',
      isTemplate: true,
    };
    if (listCategory && listCategory.length === 0) {
      setItems([templateItem]);
    }
  }, [listCategory]);

  if (status === 'loading') return <LoadingScreen />;

  return (
    <div className="category-setting" id="category-setting">
      <div className="category-setting__container">
        <div className="category-setting__container__title">
          {intl.formatMessage({ id: 'pages.store-category.title' })}
        </div>
        <div className="category-setting__container__content row">
          <div className="col-xs-6 col-md-4 category-setting__container__content__list">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="d-flex flex-column gap-2"
                  >
                    {listCategory?.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={clsx(
                              `category-setting__item`,
                              selectedId === item._id &&
                                !item?.isTemplate &&
                                'active'
                            )}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            onClick={() => {
                              setSelectedId(item._id);
                              setAction(!item.isTemplate ? 'update' : 'create');
                              if (item.isTemplate) {
                                form.setFieldsValue({
                                  name: item.name,
                                  des: item.des,
                                });
                              }
                            }}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="category-setting__item__move"
                            >
                              <DragOutlined style={{ fontSize: '24px' }} />
                            </div>
                            <div className="category-setting__item__name">
                              {item.name}
                            </div>
                            <div className="category-setting__item__delete">
                              <AuthorizedElement>
                                <DeleteOutlined
                                  style={{ fontSize: '24px' }}
                                  onClick={() => {
                                    modalConfirmDeleteCategory(item);
                                  }}
                                />
                              </AuthorizedElement>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="d-flex justify-center">
              <CustomButton
                type="primary"
                onClick={() => {
                  form.resetFields();
                  setSelectedId('');
                  setAction('create');
                  setDisabled(true);
                }}
              >
                {intl.formatMessage({ id: 'system.add' })}
              </CustomButton>
            </div>
          </div>
          <div className="col-xs-12 col-md-8 category-setting__container__content__detail">
            {selectedId || actionType === 'create' ? (
              <div className="category-setting__detail">
                <div className="category-setting__detail__title">
                  {intl.formatMessage({ id: 'pages.store-category.add.title' })}
                </div>
                <div className="category-setting__detail__form">
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFieldsChange={(_, allField) => {
                      handleChangeForm({ form, setDisabled });
                    }}
                  >
                    <Form.Item
                      label={intl.formatMessage({
                        id: 'pages.store-category.add.form.name',
                      })}
                      name={'name'}
                    >
                      <CustomInput placeholder="Please input category name" />
                    </Form.Item>
                    <Form.Item
                      label={intl.formatMessage({
                        id: 'pages.store-category.add.form.des',
                      })}
                      name={'des'}
                    >
                      <CustomInput placeholder="Please input category description" />
                    </Form.Item>
                  </Form>
                </div>
                <div className="category-setting__detail__action">
                  <CustomButton type="default" onClick={reset}>
                    {intl.formatMessage({ id: 'system.cancel' })}
                  </CustomButton>
                  <CustomButton
                    type="primary"
                    disabled={disableButton}
                    onClick={form.submit}
                  >
                    {intl.formatMessage({ id: 'system.save' })}
                  </CustomButton>
                </div>
              </div>
            ) : (
              <div className="category-setting__detail no-category">
                No Category Selected.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(CategorySetting);
