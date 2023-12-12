import { Select, SelectProps } from 'antd';
import React from 'react';
import IconSVG from '../icons/Icons';

interface CustomSelectProps<T = any> extends SelectProps<T> {}

const CustomSelect = <T extends any>(props: CustomSelectProps<T>) => {
  return (
    <Select
      {...props}
      suffixIcon={<IconSVG type="icon-select" />}
      className={`ant-custom-select ${props.className}`}
      getPopupContainer={(trigger: any) => trigger.parentNode}
    />
  );
};

export default CustomSelect;
