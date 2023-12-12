import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Empty, Form, Input, Switch } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../../components/button/SubmitButton';
import CustomInput from '../../components/input/CustomInput';
import CustomInputNumber from '../../components/input/CustomInputNumber';
import AuthorizedElement from '../../components/permission/PermissionGuardElement';
import { api, ResponseError } from '../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../utils/api/responseHandler';
import { handleChangeForm } from '../../utils/functions/common';
import { ConfirmAction } from '../../utils/functions/confirmModal';
import { ValidateLibrary } from '../../utils/validate';

const { Search } = Input;

export const AddOptions = (props: WrappedComponentProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const queryClient = useQueryClient();
  const store_id = localStorage.getItem('store_id');
  const [selectedId, setSelectedId] = useState<string>('');
  const [disableButton, setDisabled] = useState<boolean>(true);
  const [actionType, setAction] = useState<'create' | 'update' | ''>('create');
  const [search, setSearch] = useState<string>('');

  const onSearch: any['onSearch'] = (value, _e, info) => setSearch(value);

  // Get list options
  const { data, status } = useQuery(
    ['option-list', store_id, search],
    () => api.Option.getListOption({ store_id: store_id!, search: search }),
    {
      onSuccess(data) {
        // console.log(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  //Get detail option
  const { data: DetailOption, status: statusDetail } = useQuery(
    ['category-detail', selectedId],
    () => api.Option.getDetailOption({ id: selectedId }),
    {
      onSuccess(data) {
        if (data.status === 200) {
          form.setFieldsValue({
            ...data.data,
          });
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  // create option
  const { mutate: CreateOption, status: statusCreateOption } = useMutation(
    api.Option.createOption,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          reset();
          queryClient.invalidateQueries(['option-list', store_id]);
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

  // Delete option
  const { mutate: DeleteOption, status: statusDeleteCategory } = useMutation(
    api.Option.deleteOption,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          reset();
          queryClient.invalidateQueries(['option-list', store_id]);
        }
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  //Update option
  const { mutate: UpdateOption, status: statusUpdateOption } = useMutation(
    api.Option.editOption,
    {
      onSuccess: (data) => {
        CustomHandleSuccess(data.status, intl);
        reset();
        queryClient.invalidateQueries(['option-list', store_id, search]);
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  const onFinish = (value) => {
    const submitValue = {
      ...value,
      storeId: store_id,
    };
    if (actionType === 'create') {
      CreateOption(submitValue);
    } else if (actionType === 'update') {
      UpdateOption({ ...submitValue, id: selectedId });
    }
  };

  const reset = () => {
    form.resetFields();
    setAction('create');
    setSelectedId('');
  };

  const handleSelectItem = (id: string) => {
    setSelectedId(id);
    setAction('update');
  };

  const modalConfirmDeleteOption = (item) => {
    ConfirmAction(
      {
        onOk: () => {
          if (!item.isTemplate) {
            DeleteOption({ id: item._id, storeId: store_id! });
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

  return (
    <div className="option-setting" id="option-setting">
      <div className="option-setting__container">
        <div className="option-setting__container__title">
          {intl.formatMessage({ id: 'pages.store-option.title' })}
        </div>
        <div className="option-setting__container__content row">
          <div className="col-xs-6 col-md-4 option-setting__container__content__list">
            <div className="option-setting__container__content__list__search">
              <Form form={searchForm}>
                <Form.Item name={'name'}>
                  <Search
                    placeholder="Search here"
                    allowClear
                    enterButton
                    size="large"
                    onSearch={onSearch}
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="option-setting__container__content__list__options">
              <div className="option-setting__container__content__list__options__title">
                {intl.formatMessage({ id: 'pages.store-option.name' })}
              </div>
              <div className="option-setting__container__content__list__options__content">
                {data?.length > 0 ? (
                  data?.map((item, index) => (
                    <div
                      className={clsx(
                        `option-setting__item`,
                        selectedId === item._id && !item?.isTemplate && 'active'
                      )}
                      key={index + item._id}
                      onClick={() => handleSelectItem(item._id)}
                    >
                      <div className="option-setting__item__name">
                        {item.name}
                      </div>
                      <div className="option-setting__item__action">
                        <AuthorizedElement>
                          <DeleteOutlined
                            style={{ fontSize: '24px' }}
                            onClick={() => {
                              modalConfirmDeleteOption(item);
                            }}
                          />
                        </AuthorizedElement>
                      </div>
                    </div>
                  ))
                ) : (
                  <Empty />
                )}
                {}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-8 option-setting__container__content__detail">
            <div className="option-setting__detail">
              <div className="option-setting__detail__title">
                {intl.formatMessage({ id: 'pages.store-option.add.title' })}
              </div>
              <div className="option-setting__detail__form">
                <Form
                  form={form}
                  onFinish={onFinish}
                  onFieldsChange={(_, allField) => {
                    handleChangeForm({ form, setDisabled });
                  }}
                >
                  <Form.Item
                    label={intl.formatMessage({
                      id: 'pages.store-option.form.name',
                    })}
                    name={'name'}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    rules={ValidateLibrary(intl).required}
                  >
                    <CustomInput />
                  </Form.Item>
                  <div className="option-setting__detail__form__modifier">
                    <Form.List name={'modifiers'}>
                      {(fields, { add, remove }) => {
                        return (
                          <div className="option-setting__detail__form__modifier__list">
                            {fields.map((field, index) => (
                              <div
                                className="option-setting__detail__form__modifier__list__item"
                                key={field.key}
                              >
                                <Form.Item
                                  name={[index, 'status']}
                                  style={{ width: '12%' }}
                                  initialValue={false}
                                  valuePropName="checked"
                                >
                                  <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name={[index, 'name']}
                                  rules={ValidateLibrary(intl).required}
                                  wrapperCol={{ span: 22 }}
                                >
                                  <CustomInput />
                                </Form.Item>
                                <Form.Item
                                  name={[index, 'currency']}
                                  label={'USD'}
                                  labelCol={{ span: 5 }}
                                  rules={ValidateLibrary(intl).required}
                                >
                                  <CustomInputNumber />
                                </Form.Item>
                              </div>
                            ))}
                            <CustomButton type="dashed" onClick={() => add()}>
                              <PlusOutlined />
                              {intl.formatMessage({
                                id: 'pages.store-option.form.add-modifier',
                              })}
                            </CustomButton>
                          </div>
                        );
                      }}
                    </Form.List>
                  </div>
                </Form>
              </div>
              <div className="option-setting__detail__action">
                <CustomButton type="default" onClick={() => reset()}>
                  {intl.formatMessage({ id: 'system.cancel' })}
                </CustomButton>
                <CustomButton
                  type="primary"
                  onClick={form.submit}
                  disabled={disableButton}
                >
                  {intl.formatMessage({ id: 'system.save' })}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(AddOptions);
