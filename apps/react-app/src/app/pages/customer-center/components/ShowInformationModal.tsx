import { Form, Modal } from "antd";
import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import CustomButton from "../../../components/button/SubmitButton";
import CustomInput from "../../../components/input/CustomInput";
import { ValidateLibrary } from "../../../utils/validate";

type CreateQuestionProps = {
  visible: boolean;
  question: any;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateQuestion = (props: CreateQuestionProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const handleCancel = () => {
    props.setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ ...props.question });
  }, [props.question]);

  return (
    <Fragment>
      <Modal
        visible={props.visible}
        width={600}
        title={intl.formatMessage({ id: "modal.create-question.title" })}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={
          <div className="d-flex justify-center">
            <CustomButton key="submit" type="primary" onClick={handleCancel}>
              {intl.formatMessage({ id: "system.ok" })}
            </CustomButton>
          </div>
        }
      >
        <div className="modal--create-question">
          <Form labelCol={{ span: 5 }} form={form}>
            <Form.Item
              label={intl.formatMessage({
                id: "modal.create-question.form.title",
              })}
              name={"title"}
              rules={ValidateLibrary(intl).required}
            >
              <CustomInput disabled />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: "modal.create-question.form.content",
              })}
              name={"content"}
              rules={ValidateLibrary(intl).required}
            >
              <CustomInput.TextArea rows={5} disabled />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default React.memo(CreateQuestion);
