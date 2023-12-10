/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
import { UploadOutlined } from "@ant-design/icons";
import { uiActions, useAppDispatch } from "@my-app/store";
import { Button, Upload } from "antd";
import Papa from "papaparse";
import React, { forwardRef, useImperativeHandle, useState } from "react";
const Encoding = require("encoding-japanese");
interface Props {
  onChange: Function;
  label: string;
}

export const CSVSelect = forwardRef<any, Props>((props: Props, ref) => {
  const [showUploadList, setshowUploadList] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const onChange = ({ file }: any) => {
    if (file instanceof File) {
      dispatch(uiActions.setSpinning(true));
      Papa.parse(file, {
        // worker: true,
        skipEmptyLines: true,
        encoding: "Shift-JIS",
        transform: (value?: string) => {
          return value?.trim();
        },
        complete: (results) => {
          props.onChange(results.data);
          dispatch(uiActions.setSpinning(false));
        },
      });
    } else {
      props.onChange([]);
    }
    setshowUploadList(true);
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      setshowUploadList(false);
      props.onChange([]);
    },
  }));

  const beforeUpload = () => {
    return false;
  };

  return (
    <Upload
      accept=".csv"
      onChange={onChange}
      beforeUpload={beforeUpload}
      multiple={false}
      maxCount={1}
      showUploadList={showUploadList}
    >
      <Button type="primary" icon={<UploadOutlined />}>
        {props.label}
      </Button>
    </Upload>
  );
});
