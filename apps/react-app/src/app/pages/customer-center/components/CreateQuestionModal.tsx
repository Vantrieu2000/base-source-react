import { Form, Modal } from 'antd';
import React, { Fragment, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../../../components/button/SubmitButton';
import CustomInput from '../../../components/input/CustomInput';
import { api, ResponseError } from '../../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../../utils/api/responseHandler';
import { ValidateLibrary } from '../../../utils/validate';

type CreateQuestionProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateQuestion = (props: CreateQuestionProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const store_id = localStorage.getItem('store_id')!;

  //Create Question
  const { mutate: CreateQuestion, status: statusCreateQuestion } = useMutation(
    api.Customer.createQuestion,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          queryClient.invalidateQueries(['question-list']);
          form.resetFields();
          props.setVisible(false);
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

  const handleCancel = () => {
    props.setVisible(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (value) => {
    const submitValue = {
      ...value,
      storeId: store_id,
    };

    CreateQuestion(submitValue);
  };

  return (
    <Fragment>
      <Modal
        visible={props.visible}
        width={600}
        title={intl.formatMessage({ id: 'modal.create-question.title' })}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="d-flex justify-center">
            <CustomButton key="back" onClick={handleCancel}>
              {intl.formatMessage({ id: 'system.cancel' })}
            </CustomButton>
            <CustomButton
              key="submit"
              htmlType="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              {intl.formatMessage({ id: 'system.save' })}
            </CustomButton>
          </div>
        }
      >
        <div className="modal--create-question">
          <Form labelCol={{ span: 5 }} form={form} onFinish={onFinish}>
            <Form.Item
              label={intl.formatMessage({
                id: 'modal.create-question.form.title',
              })}
              name={'title'}
              rules={ValidateLibrary(intl).required}
            >
              <CustomInput />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'modal.create-question.form.content',
              })}
              name={'content'}
              rules={ValidateLibrary(intl).required}
            >
              <CustomInput.TextArea rows={5} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default React.memo(CreateQuestion);
