import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload, UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile } from "antd/lib/upload/interface";
import { useState } from "react";
import { injectIntl, useIntl, WrappedComponentProps } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CustomButton from "../../components/button/SubmitButton";
import CustomInput from "../../components/input/CustomInput";
import CustomSelect from "../../components/select/CustomSelect";
import { api, ResponseError } from "../../utils/api";
import {
  CustomHandleError,
  CustomHandleSuccess,
} from "../../utils/api/responseHandler";
import { COUNTRY_LANG } from "../../utils/constants";
import {
  CURRENCY,
  NUMBER_OF_TABLE,
  TIPS,
} from "../../utils/constants/ConstantValue";
import { beforeUpload, handleChangeForm } from "../../utils/functions/common";
import { ValidateLibrary } from "../../utils/validate";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const StorePreference = (props: WrappedComponentProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const id = localStorage.getItem("store_id");
  const [imageUrl, setImageUrl] = useState<string>();
  const [disableButton, setDisabled] = useState<boolean>(true);

  const { mutate: UpdateStore, status: statusUpdateStore } = useMutation(
    api.Store.editStore,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          queryClient.invalidateQueries(["store-infomation", id]);
          setDisabled(true);
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
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  const { data, isFetching, refetch } = useQuery(
    ["store-infomation", id],
    () => api.Store.getDetailStore(id!),
    {
      onError: (error: ResponseError) => {
        CustomHandleError(error, intl);
      },
      onSuccess(data) {
        form.setFieldsValue({ ...data });
        if (data.avatar) {
          setImageUrl(data.avatar);
        }
      },
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  const onFinish = (values: any) => {
    UpdateStore({ id: id, ...values });
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
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done" || info.file.status === "error") {
      form.setFieldsValue({
        avatar: info?.file?.response?.data as string,
      });
      setImageUrl(info?.file?.response?.data as string);
    }
  };

  return (
    <div className="store-preference" id="store-preference">
      <div className="store-preference__container">
        <div className="store-preference__container__title">
          {intl.formatMessage({ id: "pages.store-preferences.form.title" })}
        </div>
        <div className="store-preference__container__content">
          <Form
            labelCol={{
              sm: { span: 12 },
              md: { span: 6 },
              lg: { span: 4 },
            }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            form={form}
            name={"store-preference"}
            onFinish={onFinish}
            layout="horizontal"
            onFieldsChange={(_, allField) => {
              handleChangeForm({ form, setDisabled });
            }}
          >
            <Form.Item
              label="Upload"
              name={"avatar"}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <ImgCrop
                rotationSlider
                beforeCrop={beforeUpload}
                aspect={100 / 21}
              >
                <Upload
                  action={`${process.env.NX_API_BASE_URL}/store/upload-avatar/${id}`}
                  headers={{
                    authorization: localStorage.getItem("token") as string,
                  }}
                  listType="picture-card"
                  showUploadList={false}
                  onPreview={onPreview}
                  name="avatar"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.language",
              })}
              rules={ValidateLibrary(intl).required}
              name="language"
            >
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
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.store_name",
              })}
              name="name"
              rules={ValidateLibrary(intl).required}
            >
              <CustomInput
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.store_name_placeholder",
                })}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.number_of_table",
              })}
              name="table"
              rules={ValidateLibrary(intl).required}
            >
              <CustomSelect
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.number_of_table_placeholder",
                })}
                options={NUMBER_OF_TABLE.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              ></CustomSelect>
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.store_phone_number",
              })}
              name="phone"
              rules={ValidateLibrary(intl).phoneNumber}
            >
              <CustomInput
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.store_phone_number_placeholder",
                })}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.store_mail",
              })}
              name="email"
              rules={ValidateLibrary(intl).email}
            >
              <CustomInput
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.store_mail_placeholder",
                })}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.store_address",
              })}
              name="address"
              rules={ValidateLibrary(intl).required}
            >
              <CustomInput
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.store_address_placeholder",
                })}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.tip",
              })}
              name="tip"
              rules={ValidateLibrary(intl).required}
            >
              <CustomSelect
                options={TIPS.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.tip_placeholder",
                })}
              ></CustomSelect>
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.country",
              })}
              name="country"
              rules={ValidateLibrary(intl).required}
            >
              <CustomSelect
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.country_placeholder",
                })}
                options={COUNTRY_LANG.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              ></CustomSelect>
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "pages.store-preferences.form.restaurant_currency",
              })}
              name="currency"
              rules={ValidateLibrary(intl).required}
            >
              <CustomSelect
                placeholder={intl.formatMessage({
                  id: "pages.store-preferences.form.restaurant_currency_placeholder",
                })}
                options={CURRENCY.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              ></CustomSelect>
            </Form.Item>
            <div className="store-preference__container__content__action">
              <Form.Item>
                <CustomButton
                  onClick={() => {
                    refetch();
                    setTimeout(() => {
                      setDisabled(true);
                    }, 500);
                  }}
                >
                  Cancel
                </CustomButton>
              </Form.Item>
              <Form.Item>
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  disabled={disableButton}
                >
                  Save
                </CustomButton>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(StorePreference);
