/* eslint-disable @typescript-eslint/ban-types */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { TrashButton } from "@my-app/components";
import { useAppDispatch } from "@my-app/store";
import { Modal } from "antd";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";

const { confirm } = Modal;

interface Props {
  id: number | string;
  title?: string;
  content?: string;
  action: Function;
}

export const DeleteButton = (props: Props) => {
  const { id, title, content, action } = props;
  const intl = useIntl();
  const dispatch = useAppDispatch();

  function confirmDelete() {
    confirm({
      title: intl.formatMessage({ id: title || "confirm.delete.title" }),
      icon: <ExclamationCircleOutlined />,
      content: intl.formatMessage({ id: content || "confirm.delete.content" }),
      okText: intl.formatMessage({ id: "confirm.yes" }),
      okType: "danger",
      cancelText: intl.formatMessage({ id: "confirm.no" }),
      async onOk() {
        try {
          const result = await dispatch(action(id));
          unwrapResult(result);
          toast.info(intl.formatMessage({ id: "delete-success" }));
        } catch (err: any) {
          toast.error(intl.formatMessage({ id: "delete-error" }));
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return <TrashButton onClick={confirmDelete}></TrashButton>;
};
