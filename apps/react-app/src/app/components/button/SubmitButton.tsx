import { Button, ButtonProps } from 'antd';
import React from 'react';

interface CustomButtonProps extends ButtonProps {}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <Button className="ant-custom-button" {...props} />;
};

export default CustomButton;
