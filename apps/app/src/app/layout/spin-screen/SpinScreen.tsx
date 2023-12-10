import { uiSelectors } from "@my-app/store";
import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./SpinScreen.scss";

export const SpinScreen = (props: any) => {
  const spinning = useSelector(uiSelectors.spinning);
  return (
    <div key="spin-screen" className="splash-div">
      <Spin spinning={spinning}>{props.children}</Spin>
    </div>
  );
};
