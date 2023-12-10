import { Button, Form } from 'antd';
import React from 'react';

interface Props {
  form: any;
  label?: string;
  disabled: boolean;
  children?: any;
}

export const FormSubmit = ({ form, disabled, label, ...props }: Props) => {
  return (
    <Form.Item shouldUpdate labelCol={{ span: 0 }} style={{ width: '100%' }}>
      <Button
        type="primary"
        htmlType="submit"
        onClick={form.submit}
        disabled={disabled}
      >
        {label}
      </Button>
    </Form.Item>
  );
};
