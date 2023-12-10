import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

interface CustomInputProps extends InputNumberProps {}

const CustomInputNumber: React.FC<CustomInputProps> = (props) => {
  return (
    <InputNumber
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      className="ant-custom-inputnumber"
      {...props}
    />
  );
};

export default CustomInputNumber;
