import { InputNumber as IpNumber, InputNumberProps } from 'antd';
import React from 'react';

export const InputNumber = (props: InputNumberProps) => {
  return (
    <IpNumber
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {...props}
    ></IpNumber>
  );
};
