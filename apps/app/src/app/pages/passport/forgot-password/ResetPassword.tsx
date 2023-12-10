import Icon, { EyeOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { injectIntl, useIntl } from "react-intl";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as icon_eye } from "../../../../assets/images/icons/icon_eye.svg";
import { ResponseError } from "../../../utils/api";
import { CustomHandleError } from "../../../utils/api/responseHandler";
import { ReqResetPasswordDto } from "../../../utils/dto/auth.dto";
import { ROUTES } from "../../../utils/enum/RouteConst";
import { handleKeyDownNotAllowSpace } from "../../../utils/functions/common";
import { ValidateLibrary } from "../../../utils/validate";

export const ResetPassword = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user_id = searchParams.get("id");
  const token = searchParams.get("token");

  const resetPassAxios = axios.create({
    baseURL: process.env.NX_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  resetPassAxios.interceptors.request.use(async (req) => {
    let originalRequest = req;

    if (token && originalRequest.headers) {
      originalRequest.headers.Authorization = token;
      return Promise.resolve(originalRequest);
    }

    return req;
  });

  async function resetPassword(payload: ReqResetPasswordDto): Promise<any> {
    const response = await resetPassAxios.post("auth/newPassword", {
      ...payload,
    });
    return response.data;
  }

  // useEffect(() => {
  //   if (!!!token) {
  //     navigate(ROUTES.LOGIN, { replace: true });
  //   }
  // }, [pathname]);

  const { mutate, status } = useMutation(resetPassword, {
    onSuccess: () => {
      navigate(ROUTES.CHANGE_PASSWORD_SUCCESS, {
        replace: true,
        state: { status: true },
      });
    },
    onError: (error: ResponseError) => CustomHandleError(error, intl),
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <>
      <div className="passport-content reset-password">
        <div className="forgotpass-container">
          <div className="forgotpass-form">
            <Form
              name="reset-password"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              form={form}
              initialValues={{
                rememberInfo: localStorage.getItem("saveInfo") === "true",
              }}
              onFinish={onFinish}
              requiredMark={"optional"}
              size="large"
            >
              <div className="form-forgot-title">
                {intl.formatMessage({
                  id: "pages.reset-password.title",
                })}
              </div>
              <div className="separator"></div>
              <div className="mb-4 fw-bold fs-4">
                ID : <strong>{user_id}</strong>
              </div>
              <Form.Item name="password" rules={ValidateLibrary(intl).password}>
                <Input.Password
                  placeholder={intl.formatMessage({
                    id: "pages.reset-pass.new-password.placeholder",
                  })}
                  prefix={
                    <span style={{ marginRight: "10px", display: "flex" }}>
                      <MailOutlined />
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
                  autoComplete={"new-password"}
                  className="w-100"
                  maxLength={30}
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
                  placeholder={intl.formatMessage({
                    id: "pages.reset-pass.re-password.placeholder",
                  })}
                  prefix={
                    <span style={{ marginRight: "10px", display: "flex" }}>
                      <MailOutlined />
                    </span>
                  }
                  iconRender={(visible) =>
                    visible ? (
                      <EyeOutlined style={{ fontSize: "22px" }} />
                    ) : (
                      <Icon component={icon_eye} style={{ fontSize: "22px" }} />
                    )
                  }
                  autoComplete={"new-password"}
                  className="w-100"
                  maxLength={30}
                />
              </Form.Item>
            </Form>
          </div>
          <div className="forgotpass-actions">
            <Button
              className="w-100"
              type="primary"
              htmlType="submit"
              form="reset-password"
              loading={status === "loading"}
              size="large"
            >
              {intl.formatMessage({
                id: "pages.reset-password.action.submit",
              })}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default injectIntl(ResetPassword);
