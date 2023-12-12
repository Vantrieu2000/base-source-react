import { Modal } from "antd";
import { useIntl } from "react-intl";

interface ConfirmDeleteProps {
  visible: boolean;
  className?: string;
  onCancel: () => void;
  onOk: () => void;
  message: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  visible,
  className,
  onCancel,
  onOk,
  message,
}) => {
  const intl = useIntl();
  return (
    <Modal
      className={className}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      centered
      closable={false}
      maskClosable={false}
      okText={intl.formatMessage({ id: "system.delete" })}
      cancelText={intl.formatMessage({ id: "system.cancel" })}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmDelete;
