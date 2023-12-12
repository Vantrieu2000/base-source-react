import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { IntlShape } from 'react-intl';

export function NoticeAction(
  actions: {
    onOk?: () => void;
  } = {
    onOk: () => {},
  },
  intl: IntlShape,
  custom: {
    title?: string;
    okText?: string;
    cancelText?: string;
  } = {
    title: 'system.confirm.title',
    okText: 'yes',
  }
) {
  let title = intl.formatMessage({ id: custom.title });
  let okText = intl.formatMessage({ id: custom.okText });

  Modal.confirm({
    title,
    okText,
    centered: true,
    className : "modal-notice",
    icon: <></>,
    onOk() {
      actions.onOk && actions.onOk();
    },
    okButtonProps: {
        className: 'w-50'
    },
    cancelButtonProps: {
        className: 'd-none'
    },
  });
}
