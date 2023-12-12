import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import './SpinScreen.scss';

export const SpinScreen = (props: any) => {
  return (
    <div key="spin-screen" className="splash-div">
      <Spin spinning={false}>{props.children}</Spin>
    </div>
  );
};
