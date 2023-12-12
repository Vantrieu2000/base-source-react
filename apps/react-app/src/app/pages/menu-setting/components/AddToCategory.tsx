import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, Row, Switch, Upload, UploadFile } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../../../components/button/SubmitButton';
import CustomInput from '../../../components/input/CustomInput';
import CustomInputNumber from '../../../components/input/CustomInputNumber';
import CustomSelect from '../../../components/select/CustomSelect';
import { api, ResponseError } from '../../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../../utils/api/responseHandler';
import {
  FOODS_LABEL,
  FOODS_TARGET,
  SPICY_UNIT,
} from '../../../utils/constants/ConstantValue';
import { beforeUpload, guidGenerator } from '../../../utils/functions/common';
import { ValidateLibrary } from '../../../utils/validate';

type AddToCategoryProps = {
  category: any;
  setPage: React.Dispatch<React.SetStateAction<'add' | 'list'>>;
};

export const AddToCategory = (
  props: WrappedComponentProps & AddToCategoryProps
) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [signlePrice, setSinglePrice] = useState<boolean>(true);
  const store_id = localStorage.getItem('store_id');
  const [imageUrl, setImageUrl] = useState<string>();

  // Get list options
  const { data: listOptions, status: statusOption } = useQuery(
    ['option-list', store_id],
    () => api.Option.getListOption({ store_id: store_id! }),
    {
      onSuccess(data) {},
      refetchOnWindowFocus: false,
    }
  );

  //Create A Menu
  const { mutate: CreateMenu, status: statusCreateMenu } = useMutation(
    api.Menu.createMenu,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          queryClient.invalidateQueries(['menu-list']);
          props.setPage('list');
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

  const onFinish = (value: any) => {
    const submitValue = {
      menuItems: [
        {
          ...value,
          storeId: store_id,
          categoryName: props?.category?.name,
          categoryId: props?.category?._id,
          photo: imageUrl,
          price: signlePrice ? [value.price] : [...value.price],
        },
      ],
    };

    CreateMenu(submitValue as any);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  //handle change image upload
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done' || info.file.status === 'error') {
      form.setFieldsValue({
        avatar: info?.file?.response?.data as string,
      });
      setImageUrl(info?.file?.response?.data as string);
    }
  };

  return (
    <div className="menu-setting" id="menu-setting">
      <div className="menu-setting__container">
        <div className="menu-setting__container__title">
          {intl.formatMessage({ id: 'pages.menu-setting.title' })}
        </div>
        <div className="menu-setting__container__category row">
          <div className="col-md-3 col-xs-4">
            <p className="fs-4 fw-bold">
              {intl.formatMessage({
                id: 'pages.menu-setting.list.category',
              })}
            </p>
            <CustomSelect
              value={props?.category?.name}
              style={{ width: '100%' }}
              disabled
            />
          </div>
        </div>
        <div className="menu-setting__container__add-category__content row">
          <div className="col-lg-10 col-md-12 ">
            <Form form={form} labelCol={{ span: 3 }} onFinish={onFinish}>
              <Form.Item
                label={
                  <div className="required-label">
                    {intl.formatMessage({ id: 'pages.menu.form.menu-name' })}
                  </div>
                }
                name={'name'}
                rules={ValidateLibrary(intl).required}
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: 'pages.menu.form.des' })}
                name={'des'}
              >
                <CustomInput.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label={
                  <div className="required-label">
                    {intl.formatMessage({ id: 'pages.menu.form.price' })}
                  </div>
                }
              >
                <Form.List name={'price'}>
                  {(fields, { add, remove }) => {
                    return (
                      <div className="add-category-price">
                        {fields.length === 0 ? (
                          <Form.Item
                            name="price"
                            key={99999}
                            rules={ValidateLibrary(intl).required}
                          >
                            <CustomInputNumber />
                          </Form.Item>
                        ) : (
                          fields.map((field, index) => (
                            <div
                              className="add-category-price__item d-flex gap-4"
                              key={field.key}
                            >
                              <Form.Item name={[index, 'size']}>
                                <CustomInput
                                  placeholder={intl.formatMessage({
                                    id: 'system.size',
                                  })}
                                />
                              </Form.Item>
                              <Form.Item
                                name={[index, 'price']}
                                rules={ValidateLibrary(intl).required}
                              >
                                <CustomInput
                                  placeholder={intl.formatMessage({
                                    id: 'system.usd',
                                  })}
                                />
                              </Form.Item>
                            </div>
                          ))
                        )}

                        {fields.length < 3 && (
                          <CustomButton
                            type="dashed"
                            onClick={() => {
                              if (signlePrice) {
                                form.setFieldsValue({ price: '' });
                              }
                              setSinglePrice(false);
                              add();
                            }}
                          >
                            {intl.formatMessage({
                              id: 'system.add',
                            })}
                          </CustomButton>
                        )}
                      </div>
                    );
                  }}
                </Form.List>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: 'pages.menu.form.warning' })}
                name={'ingredientWarning'}
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: 'pages.menu.form.ingredient' })}
                name={'ingredient'}
              >
                <CustomInput />
              </Form.Item>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ id: 'pages.menu.form.origin' })}
                    name={'origin'}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({
                      id: 'pages.menu.form.spici_unit',
                    })}
                    name={'spicyUnit'}
                    labelCol={{ span: 6 }}
                  >
                    <CustomSelect
                      options={SPICY_UNIT.map((item) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ id: 'pages.menu.form.label' })}
                    name={'labels'}
                    labelCol={{ span: 6 }}
                  >
                    <CustomSelect
                      options={FOODS_LABEL.map((item) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ id: 'pages.menu.form.target' })}
                    name={'target'}
                    labelCol={{ span: 6 }}
                    initialValue={'store'}
                  >
                    <CustomSelect
                      options={FOODS_TARGET.map((item) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label={intl.formatMessage({
                  id: 'pages.menu.form.sold_out_sign',
                })}
                name={'soldOutSign'}
                initialValue={false}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  id: 'pages.menu.form.add_option',
                })}
                name={'options'}
                wrapperCol={{ span: 8 }}
              >
                <CustomSelect
                  options={listOptions?.map((option) => ({
                    label: option.name,
                    value: option._id,
                  }))}
                  mode="multiple"
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  id: 'pages.menu.form.register_photo',
                })}
                name={'photo'}
              >
                <ImgCrop rotationSlider beforeCrop={beforeUpload}>
                  <Upload
                    action={`${
                      process.env.NX_API_BASE_URL
                    }/image/${guidGenerator()}`}
                    headers={{
                      authorization: localStorage.getItem('token') as string,
                    }}
                    listType="picture-card"
                    showUploadList={false}
                    onPreview={onPreview}
                    progress={{ strokeWidth: 2 }}
                    name="avatar"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '-webkit-fill-available' }}
                      />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>
                          {intl.formatMessage({
                            id: 'system.upload',
                          })}
                        </div>
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <div className="form-action d-flex align-center justify-center gap-3">
                <CustomButton
                  onClick={() => {
                    props.setPage('list');
                  }}
                >
                  {intl.formatMessage({ id: 'system.cancel' })}
                </CustomButton>
                <CustomButton type="primary" htmlType="submit">
                  {intl.formatMessage({ id: 'system.save' })}
                </CustomButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(React.memo(AddToCategory));
