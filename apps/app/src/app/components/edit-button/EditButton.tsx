/* eslint-disable @typescript-eslint/ban-types */
import { EditButton as EditBtn, FormModal } from "@my-app/components";
import { useRef } from "react";
import { useIntl } from "react-intl";

interface Props {
  id: number | string;
  title?: any;
  component: React.ComponentType<any>;
  width?: number;
  onSuccess?: Function;
}

export const EditButton = (props: Props) => {
  const { id, width, title } = props;
  const intl = useIntl();
  const Comp = props.component;

  const ref: any = useRef();

  const onUserFormSuccess = () => {
    ref.current.hide();
    props.onSuccess && props.onSuccess();
  };

  const onUserFormError = () => {
    ref.current.hide();
  };

  return (
    <>
      <EditBtn
        onClick={() => {
          ref.current.show();
        }}
      ></EditBtn>

      <FormModal ref={ref} width={width || 500} title={title || intl.formatMessage({ id: "modal.update.title" })}>
        <Comp
          id={id}
          onSuccess={onUserFormSuccess}
          onCancel={onUserFormSuccess}
          onError={() => ref.current.hide()}
        ></Comp>
      </FormModal>
    </>
  );
};
