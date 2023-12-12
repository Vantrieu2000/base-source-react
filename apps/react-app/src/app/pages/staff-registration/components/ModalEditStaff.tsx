import { SearchOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import { useIntl } from "react-intl";
import CustomButton from "../../../components/button/SubmitButton";
import CustomInput from "../../../components/input/CustomInput";
import CustomSelect from "../../../components/select/CustomSelect";
import { ValidateLibrary } from "../../../utils/validate";

interface EditStaffProps {}

export default function ModalEditStaff({}: EditStaffProps) {
  const intl = useIntl();
  const [form] = Form.useForm();

  return (
    <Modal visible={true} onCancel={() => {}} title={"Staff Add"} footer={null}>
      <div className="modal--register-staff">
        <Form
          className="d-flex"
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
        >
          <div className="content w-100 d-flex ">
            <div className=" w-80">
              <Form.Item
                label={intl.formatMessage({ id: "system.id" })}
                name="id"
                rules={ValidateLibrary(intl).name}
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: "system.email" })}
                name="email"
                rules={ValidateLibrary(intl).email}
              >
                <CustomInput disabled />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: "system.name" })}
                name="name"
                rules={ValidateLibrary(intl).required}
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  id: "modal.register-staff.form.access",
                })}
                name="accessLevel"
                rules={ValidateLibrary(intl).required}
              >
                <CustomSelect />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: "system.status" })}
                name="status"
                rules={ValidateLibrary(intl).required}
              >
                <CustomSelect />
              </Form.Item>
            </div>
            <div className="search w-20">
              <CustomButton
                className="w-100"
                type="primary"
                icon={<SearchOutlined />}
              />
            </div>
          </div>
          <div className="footer d-flex justify-center gap-4">
            <CustomButton>Cancel</CustomButton>
            <CustomButton type="primary">Save</CustomButton>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
