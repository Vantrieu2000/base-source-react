/* eslint-disable jsx-a11y/anchor-is-valid */
import Icon, {
  EyeOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { injectIntl, useIntl, WrappedComponentProps } from "react-intl";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ReactComponent as icon_eye } from "../../../../assets/images/icons/icon_eye.svg";
import CustomInput from "../../../components/input/CustomInput";
import CustomSelect from "../../../components/select/CustomSelect";
import { api, ResponseError } from "../../../utils/api";
import { CustomHandleError } from "../../../utils/api/responseHandler";
import { COUNTRY_LANG } from "../../../utils/constants";
import { ROUTES } from "../../../utils/enum/RouteConst";
import { handleKeyDownNotAllowSpace } from "../../../utils/functions/common";
import { ValidateLibrary } from "../../../utils/validate";

export function Register(props: WrappedComponentProps) {
  const intl = useIntl();
  const navigate = useNavigate();

  const { mutate, status } = useMutation(api.Auth.register, {
    onSuccess: (data) => {
      if (data.status === 200) {
        navigate(ROUTES.REGISTER_SUCCESS, { replace: true });
      } else {
        CustomHandleError(
          {
            statusCode: data.status,
            message: data.message,
            error: "Error",
          },
          intl
        );
      }
    },
    onError: (error: ResponseError) => {
      CustomHandleError(error, intl);
    },
  });

  const onFinish = (values: any) => {
    localStorage.setItem("saveInfo", `${Boolean(values.rememberInfo)}`);

    values.rememberInfo && delete values.rememberInfo;
    mutate({ ...values, name: "Admin" });
  };

  const autoCompleteMode =
    localStorage.getItem("saveInfo") === "true" ? "on" : "new-password";

  const handleOk = () => {
    console.log("OK button clicked");
  };

  return (
    <div className="passport-content register">
      <Form
        name="login"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          rememberInfo: localStorage.getItem("saveInfo") === "true",
        }}
        onFinish={onFinish}
        size="large"
        className="d-flex flex-column justify-center"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <div className="form-login-title">
          {intl.formatMessage({ id: "pages.register" })}
        </div>

        <div className="separator separator-login"></div>
        <Form.Item>
          <CustomSelect
            options={COUNTRY_LANG.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            placeholder={intl.formatMessage({
              id: "pages.select.language.placeholder",
            })}
          ></CustomSelect>
        </Form.Item>
        <Form.Item name="id" rules={ValidateLibrary(intl).name}>
          <CustomInput
            prefix={
              <span style={{ marginRight: "10px", display: "flex" }}>
                <IdcardOutlined />
              </span>
            }
            placeholder={intl.formatMessage({
              id: "pages.login.id.placeholder",
            })}
            autoComplete={autoCompleteMode}
          />
        </Form.Item>
        {/* <Form.Item name="name" rules={ValidateLibrary(intl).name}>
                    <CustomInput
                        prefix={
                            <span style={{ marginRight: "10px", display: "flex" }}>
                                <UserOutlined />
                            </span>
                        }
                        placeholder={intl.formatMessage({ id: "pages.login.name.placeholder" })}
                        autoComplete={autoCompleteMode}
                    />
                </Form.Item> */}
        <Form.Item name="email" rules={ValidateLibrary(intl).email}>
          <CustomInput
            prefix={
              <span style={{ marginRight: "10px", display: "flex" }}>
                <MailOutlined />
              </span>
            }
            placeholder={intl.formatMessage({
              id: "pages.login.email.placeholder",
            })}
            autoComplete={autoCompleteMode}
          />
        </Form.Item>
        <Form.Item name="password" rules={ValidateLibrary(intl).password}>
          <Input.Password
            prefix={
              <span style={{ marginRight: "10px", display: "flex" }}>
                <LockOutlined />
              </span>
            }
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined style={{ fontSize: "22px" }} />
              ) : (
                <Icon component={icon_eye} style={{ fontSize: "22px" }} />
              )
            }
            onKeyDown={handleKeyDownNotAllowSpace}
            placeholder={intl.formatMessage({ id: "password" })}
            autoComplete={autoCompleteMode}
          />
        </Form.Item>
        <Form.Item
          name="confirmPw"
          rules={[
            ...ValidateLibrary(intl).password,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    intl.formatMessage({
                      id: "validate.password.requiredsame",
                    })
                  )
                );
              },
            }),
          ]}
          dependencies={["password"]}
        >
          <Input.Password
            prefix={
              <span style={{ marginRight: "10px", display: "flex" }}>
                <LockOutlined />
              </span>
            }
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined style={{ fontSize: "22px" }} />
              ) : (
                <Icon component={icon_eye} style={{ fontSize: "22px" }} />
              )
            }
            onKeyDown={handleKeyDownNotAllowSpace}
            placeholder={intl.formatMessage({ id: "confirm-password" })}
            autoComplete={autoCompleteMode}
          />
        </Form.Item>
      </Form>
      <div className="passport-content_submit">
        <Button
          className="w-100 btn-login"
          type="primary"
          htmlType="submit"
          form="login"
          size="large"
          loading={status === "loading"}
        >
          {intl.formatMessage({ id: "pages.register.submit" })}
        </Button>
        <Button
          className="w-100 btn-login mt-2"
          type="default"
          onClick={() => navigate(ROUTES.LOGIN, { replace: true })}
          form="login"
          size="large"
        >
          {intl.formatMessage({ id: "pages.register.cancel" })}
        </Button>
      </div>
    </div>
  );
}

export default injectIntl(Register);
