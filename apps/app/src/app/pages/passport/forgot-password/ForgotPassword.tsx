/* eslint-disable jsx-a11y/anchor-is-valid */
import { MailOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../../components/input/CustomInput';
import { api, ResponseError } from '../../../utils/api';
import { CustomHandleError } from '../../../utils/api/responseHandler';
import { ROUTES } from '../../../utils/enum/RouteConst';
import { ValidateLibrary } from '../../../utils/validate';

export function ForgotPassword(props: WrappedComponentProps) {
  const intl = useIntl();
  const navigate = useNavigate();

  const { mutate, status } = useMutation(api.Auth.forgotPassword, {
    onSuccess: () => {
      navigate(ROUTES.FORGOT_PASSWORD_NOITICE, {
        state: true,
      });
    },
    onError: (error: ResponseError) => CustomHandleError(error, intl),
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <>
      <div className="passport-content">
        <div className="forgotpass-container">
          <div className="forgotpass-form">
            <Form
              name="forgot-password"
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                rememberInfo: localStorage.getItem('saveInfo') === 'true',
              }}
              onFinish={onFinish}
              size="large"
            >
              <div className="form-forgot-title">
                {intl.formatMessage({ id: 'pages.forgot-pass' })}
              </div>
              <div className="form-forgot-under-title">
                {intl.formatMessage({ id: 'pages.forgot-pass-under-title' })}
              </div>
              <div className="separator"></div>
              <Form.Item name="email" rules={ValidateLibrary(intl).email}>
                <CustomInput
                  placeholder={intl.formatMessage({
                    id: 'pages.forgot-pass.input.email.placeholder',
                  })}
                  prefix={
                    <span style={{ marginRight: "10px", display: "flex" }}>
                      <MailOutlined />
                    </span>
                  }
                  autoComplete={'new-password'}
                  className="w-100"
                />
              </Form.Item>
            </Form>
          </div>
          <div className="forgotpass-actions">
            <Button
              className="w-100 mb-5"
              type="primary"
              htmlType="submit"
              form="forgot-password"
              loading={status === 'loading'}
              size="large"
            >
              {intl.formatMessage({
                id: 'pages.forgot-pass.input.action.submit',
              })}
            </Button>
            <Link to={ROUTES.LOGIN}>
              {intl.formatMessage({ id: 'pages.login.back-login' })}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default injectIntl(ForgotPassword);
