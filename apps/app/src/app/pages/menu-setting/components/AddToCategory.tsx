import { CheckOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Col, Form, Row, Switch, Upload } from "antd";
import { useState } from "react";
import { injectIntl, useIntl, WrappedComponentProps } from "react-intl";
import { useQuery } from "react-query";
import CustomButton from "../../../components/button/SubmitButton";
import CustomInput from "../../../components/input/CustomInput";
import CustomSelect from "../../../components/select/CustomSelect";
import { api } from "../../../utils/api";
import { FOODS_LABEL, FOODS_TARGET, SPICY_UNIT } from "../../../utils/constants/ConstantValue";
import { ValidateLibrary } from "../../../utils/validate";

type AddToCategoryProps = {
  category: string;
  setPage: React.Dispatch<React.SetStateAction<"add" | "list">>;
};

interface Column {
  name: string;
  key: number;
}

export const AddToCategory = (props: WrappedComponentProps & AddToCategoryProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const store_id = localStorage.getItem("store_id");
  const [dataExcel, setDataExcel] = useState<{ data: any; cols: any }>();

  const { data, status } = useQuery(["category-list", store_id], () => api.Category.getListCategory(store_id!), {
    onSuccess(data) {},
    refetchOnWindowFocus: false,
    enabled: !!store_id,
  });

  // Get list options
  const { data: listOptions, status: statusOption } = useQuery(
    ["option-list", store_id],
    () => api.Option.getListOption({ store_id: store_id! }),
    {
      onSuccess(data) {},
      refetchOnWindowFocus: false,
    }
  );

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <div className="menu-setting" id="menu-setting">
      <div className="menu-setting__container">
        <div className="menu-setting__container__title">{intl.formatMessage({ id: "pages.menu-setting.title" })}</div>
        <div className="menu-setting__container__category row">
          <div className="col-md-3 col-xs-4">
            <p className="fs-4 fw-bold">
              {intl.formatMessage({
                id: "pages.menu-setting.list.category",
              })}
            </p>
            <CustomSelect
              options={data?.map((item) => ({
                label: item.name,
                value: item._id,
              }))}
              value={props.category}
              style={{ width: "100%" }}
              disabled
            />
          </div>
        </div>
        <div className="menu-setting__container__add-category__content row">
          <div className="col-lg-10 col-md-12 ">
            <Form form={form} labelCol={{ span: 3 }} onFinish={onFinish}>
              <Form.Item label="Menu name" name={"name"} rules={ValidateLibrary(intl).required}>
                <CustomInput />
              </Form.Item>
              <Form.Item label="Description" name={"des"} rules={ValidateLibrary(intl).required}>
                <CustomInput.TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Price">
                <Form.List name={"price"}>
                  {(fields, { add, remove }) => {
                    return (
                      <div className="add-category-price">
                        {fields.map((field, index) => (
                          <div className="add-category-price__item d-flex gap-4" key={field.key}>
                            <Form.Item name={[index, "size"]} rules={ValidateLibrary(intl).required}>
                              <CustomInput
                                placeholder={intl.formatMessage({
                                  id: "system.size",
                                })}
                              />
                            </Form.Item>
                            <Form.Item name={[index, "price"]} rules={ValidateLibrary(intl).required}>
                              <CustomInput
                                placeholder={intl.formatMessage({
                                  id: "system.usd",
                                })}
                              />
                            </Form.Item>
                          </div>
                        ))}
                        <CustomButton type="dashed" onClick={() => add()}>
                          {intl.formatMessage({
                            id: "system.add",
                          })}
                        </CustomButton>
                      </div>
                    );
                  }}
                </Form.List>
              </Form.Item>
              <Form.Item label="Ingredient warning" name={"ingredientWarning"} rules={ValidateLibrary(intl).required}>
                <CustomInput />
              </Form.Item>
              <Form.Item label="Ingredient" name={"ingredient"} rules={ValidateLibrary(intl).required}>
                <CustomInput />
              </Form.Item>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="origin"
                    name={"origin"}
                    rules={ValidateLibrary(intl).required}
                    labelCol={{ span: 6 }}
                  >
                    <CustomInput />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Spicy unit"
                    name={"spicyUnit"}
                    rules={ValidateLibrary(intl).required}
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
                    label="Labels"
                    name={"labels"}
                    rules={ValidateLibrary(intl).required}
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
                    label="Target"
                    name={"target"}
                    rules={ValidateLibrary(intl).required}
                    labelCol={{ span: 6 }}
                  >
                    <CustomSelect
                      defaultValue={"store"}
                      options={FOODS_TARGET.map((item) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Sold out sign" name={"soldOutSign"} rules={ValidateLibrary(intl).required}>
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
              </Form.Item>
              <Form.Item
                label="Add options"
                name={"options"}
                rules={ValidateLibrary(intl).required}
                wrapperCol={{ span: 8 }}
              >
                <CustomSelect
                  options={listOptions?.map((option) => ({
                    label: option.name,
                    value: option._id,
                  }))}
                />
              </Form.Item>
              <Form.Item label="Register photo" name={"photo"} rules={ValidateLibrary(intl).required}>
                <Upload {...props}>
                  <CustomButton icon={<UploadOutlined />}>Click to Upload</CustomButton>
                </Upload>
              </Form.Item>
              <div className="form-action d-flex align-center justify-center gap-3">
                <CustomButton
                  onClick={() => {
                    props.setPage("list");
                  }}
                >
                  {intl.formatMessage({ id: "system.cancel" })}
                </CustomButton>
                <CustomButton type="primary" htmlType="submit">
                  {intl.formatMessage({ id: "system.save" })}
                </CustomButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(AddToCategory);
