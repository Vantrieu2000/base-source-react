import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { IntlShape } from "react-intl";

export function ConfirmDeleteAction(
  actions: {
    onOk?: () => void;
    onCancel?: () => void;
  } = {
    onOk: () => {},
    onCancel: () => {},
  },
  intl: IntlShape,
  custom: {
    title?: string;
    content?: string;
    okText?: string;
    cancelText?: string;
  } = {
    title: "system.confirm.title",
    content: "system.confirm.content",
    okText: "yes",
    cancelText: "no",
  }
) {
  let title = intl.formatMessage({ id: custom.title });
  let content = intl.formatMessage({ id: custom.content });
  let okText = intl.formatMessage({ id: custom.okText });
  let cancelText = intl.formatMessage({ id: custom.cancelText });

  Modal.warning({
    title,
    content,
    okText,
    cancelText,
    centered: true,
    icon: <ExclamationCircleOutlined />,
    onOk() {
      actions.onOk && actions.onOk();
    },
    onCancel() {
      actions.onCancel && actions.onCancel();
    },
    okButtonProps: {
      className: "w-100",
    },
    cancelButtonProps: {
      className: "w-100 grey-btn",
    },
  });
}
