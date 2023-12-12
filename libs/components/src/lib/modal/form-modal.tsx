/* eslint-disable @typescript-eslint/ban-types */
import { Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

type Props = {
  children?: React.ReactNode;
  width?: number;
  title?: string;
  onCancel?: Function;
};

export const FormModal = forwardRef<any, Props>(
  ({ children, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        show() {
          setVisible(true);
        },

        hide() {
          setVisible(false);
        },
      }),
      []
    );

    const onCancel = () => {
      setVisible(false);
      props.onCancel && props.onCancel();
    };

    return (
      <Modal
        {...props}
        visible={visible}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={onCancel}
      >
        {children}
      </Modal>
    );
  }
);
