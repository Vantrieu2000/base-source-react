import { Form } from 'antd';
import { useState } from 'react';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../../../components/button/SubmitButton';
import CustomInput from '../../../components/input/CustomInput';
import { api, ResponseError } from '../../../utils/api';
import { CustomHandleError } from '../../../utils/api/responseHandler';
import { MeDto } from '../../../utils/dto/auth.dto';
import { handleChangeForm } from '../../../utils/functions/common';
import { ValidateLibrary } from '../../../utils/validate';

type StoreItemProps = {
  setComponent: React.Dispatch<React.SetStateAction<number>>;
};

type RegisterStoreForm = {
  name: string;
  url: string;
};

const RegisterStore = (props: StoreItemProps & WrappedComponentProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [disableButton, setDisabled] = useState<boolean>(true);

  const user: MeDto | undefined = queryClient.getQueryData(['me'])!;

  const { mutate: createStore, status } = useMutation(api.Store.createStore, {
    onSuccess: () => {
      props.setComponent(1);
    },
    onError: (error: ResponseError) => {
      CustomHandleError(error, intl);
    },
  });

  const onFinish = (values: RegisterStoreForm) => {
    const payload = {
      name: values.name,
      url: 'https://qrnmenu.com/' + values.url,
      email: user?.email,
      position: 'owner',
    };

    createStore(payload);
  };

  return (
    <div className="register-store__container">
      <Form
        form={form}
        onFinish={onFinish}
        onFieldsChange={(_, allField) => {
          handleChangeForm({ form, setDisabled });
        }}
      >
        <div className="register-store__container__name">
          <div className="register-store__container__name__input">
            <Form.Item rules={ValidateLibrary(intl).required} name={'name'}>
              <CustomInput
                placeholder={intl.formatMessage({
                  id: 'pages.select-store.register_store_placeholder',
                })}
              />
            </Form.Item>
          </div>
          <div className="register-store__container__name__spec">
            {intl.formatMessage({
              id: 'pages.select-store.register_store_spec',
            })}
          </div>
        </div>
        <div className="register-store__container__url">
          <div className="register-store__container__url__input">
            <span>https://qrnmenu.com/</span>
            <Form.Item rules={ValidateLibrary(intl).urlStore} name={'url'}>
              <CustomInput />
            </Form.Item>
          </div>
          <div className="register-store__container__url__rules">
            <ul>
              <li>
                {intl.formatMessage({
                  id: 'pages.select-store.register_store_first_rule',
                })}
              </li>
              <li>
                {intl.formatMessage({
                  id: 'pages.select-store.register_store_second_rule',
                })}
              </li>
              <li>
                {intl.formatMessage({
                  id: 'pages.select-store.register_store_third_rule',
                })}
              </li>
            </ul>
          </div>
        </div>
        <div className="register-store__container__action">
          <CustomButton type="default" onClick={() => props.setComponent(1)}>
            Cancel
          </CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            disabled={disableButton}
          >
            Confirm
          </CustomButton>
        </div>
      </Form>
    </div>
  );
};

export default injectIntl(RegisterStore);
