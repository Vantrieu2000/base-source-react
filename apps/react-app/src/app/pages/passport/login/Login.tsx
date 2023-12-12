/* eslint-disable jsx-a11y/anchor-is-valid */
import Icon, {
  EyeOutlined,
  IdcardOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as icon_eye } from '../../../../assets/images/icons/icon_eye.svg';
import IconSVG from '../../../components/icons/Icons';
import CustomInput from '../../../components/input/CustomInput';
import { api, ResponseError } from '../../../utils/api';
import { CustomHandleError } from '../../../utils/api/responseHandler';
import { ROUTES } from '../../../utils/enum/RouteConst';
import { handleKeyDownNotAllowSpace } from '../../../utils/functions/common';
import { ValidateLibrary } from '../../../utils/validate';
import CustomSelect from '../../../components/select/CustomSelect';
import { COUNTRY_LANG } from '../../../utils/constants';

export function Login(props: WrappedComponentProps) {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, status } = useMutation(api.Auth.login, {
    onMutate: () => {
      queryClient.removeQueries(['me']);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      queryClient.invalidateQueries(['token']);
      queryClient.invalidateQueries(['me']);
      // localStorage.setItem('isLogin', data.isSuccess.toString());
      // queryClient.invalidateQueries('isLogin');
    },
    onError: (error: ResponseError) => {
      CustomHandleError(error, intl);

      // localStorage.setItem('token', 'data.data.token');
      // localStorage.setItem('isLogin', 'data.isSuccess.toString()');
    },
  });

  const onFinish = (values: any) => {
    localStorage.setItem('saveInfo', `${Boolean(values.rememberInfo)}`);

    values.rememberInfo && delete values.rememberInfo;
    mutate(values);
  };

  const autoCompleteMode =
    localStorage.getItem('saveInfo') === 'true' ? 'on' : 'new-password';

  return (
    <div className="passport-content">
      <Form
        name="login"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          rememberInfo: localStorage.getItem('saveInfo') === 'true',
        }}
        onFinish={onFinish}
        size="large"
        className="d-flex flex-column justify-center"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <div className="form-login-title">
          {intl.formatMessage({ id: 'pages.login' })}
        </div>

        <div className="separator separator-login"></div>
        <Form.Item>
          <CustomSelect
            options={COUNTRY_LANG.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            placeholder={intl.formatMessage({
              id: 'pages.select.language.placeholder',
            })}
          ></CustomSelect>
        </Form.Item>
        <Form.Item name="id" rules={ValidateLibrary(intl).name}>
          <CustomInput
            prefix={
              <span style={{ marginRight: '10px', display: 'flex' }}>
                <IdcardOutlined />
              </span>
            }
            placeholder={intl.formatMessage({
              id: 'pages.login.id.placeholder',
            })}
            autoComplete={autoCompleteMode}
          />
        </Form.Item>
        <Form.Item
          name="password"
          className="mb-1"
          rules={ValidateLibrary(intl).password}
        >
          <Input.Password
            prefix={
              <span style={{ marginRight: '10px', display: 'flex' }}>
                <LockOutlined />
              </span>
            }
            onKeyDown={handleKeyDownNotAllowSpace}
            placeholder={intl.formatMessage({ id: 'password' })}
            autoComplete={autoCompleteMode}
          />
        </Form.Item>
        <div className="d-flex justify-content-between mt-4">
          <Link title="Forgot password" to={ROUTES.REGISTER}>
            {intl.formatMessage({ id: 'pages.login.join-membership' })}
          </Link>
          <Link title="Forgot password" to={ROUTES.FORGOT_PASSWORD}>
            {intl.formatMessage({ id: 'pages.login.forgot-password' })}
          </Link>
        </div>
      </Form>
      <div className="passport-content_submit">
        <Button
          className="w-100 btn-login"
          type="primary"
          htmlType="submit"
          form="login"
          size="large"
          loading={status === 'loading'}
        >
          {intl.formatMessage({ id: 'pages.login.submit' })}
        </Button>
      </div>
    </div>
  );
}

export default injectIntl(Login);
