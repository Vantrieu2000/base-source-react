import { Button, Form, Modal } from 'antd';
import React, { Fragment, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomSelect from '../../../components/select/CustomSelect';
import { api, ResponseError } from '../../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../../utils/api/responseHandler';
import { CategoryDto } from '../../../utils/dto/category.dto';
import { ValidateLibrary } from '../../../utils/validate';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: any[];
}

const ModalSelectCategory = (props: ModalProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const store_id = localStorage.getItem('store_id');
  const [loading, setLoading] = useState(false);

  const dataCategory: CategoryDto[] | undefined = queryClient.getQueryData([
    'category-list',
    store_id,
  ]);

  const handleOk = () => {
    form.submit();
  };

  //Edit
  const { mutate: EditMenu, status: statusEditMenu } = useMutation(
    api.Menu.editMenu,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          window.location.reload();
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

  const onFinish = (value) => {
    const getCategoryIdByName = dataCategory?.filter(
      (item) => item.name === value.categoryTo
    )[0]!;

    const submitValue = {
      menuItems: props.selectedItem.map(({ _id, ...item }) => ({
        ...item,
        id: _id,
        categoryName: value.categoryTo,
        categoryId: getCategoryIdByName._id,
      })),
    };

    EditMenu(submitValue as any);
  };

  const handleCancel = () => {
    props.setVisible(false);
  };

  return (
    <Fragment>
      <Modal
        visible={props.visible}
        title={intl.formatMessage({ id: 'modal.select-category.title' })}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="d-flex justify-center">
            <Button key="back" onClick={handleCancel}>
              {intl.formatMessage({ id: 'system.cancel' })}
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              {intl.formatMessage({ id: 'system.submit' })}
            </Button>
          </div>
        }
      >
        <div className="modal--select-category">
          <Form labelCol={{ span: 10 }} form={form} onFinish={onFinish}>
            <Form.Item label="Selected menu">
              {props.selectedItem?.map((item) => item.name).join(', ')}
            </Form.Item>
            <Form.Item
              name={'categoryTo'}
              label={intl.formatMessage({
                id: 'modal.menu-settings.select-category.form.select',
              })}
              rules={ValidateLibrary(intl).required}
            >
              <CustomSelect
                options={dataCategory?.map((item) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default React.memo(ModalSelectCategory);
