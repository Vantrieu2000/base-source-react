/* eslint-disable @typescript-eslint/ban-types */
import * as API from '@react-app/services';
import { Checkbox, CheckboxProps } from 'antd';
import * as _ from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';

export const OrderStatusCheckbox = (props: CheckboxProps) => {
  const items = [
    API.OrderDtoOrderStatusEnum.Unresolved,
    API.OrderDtoOrderStatusEnum.Delivered,
  ];
  const intl = useIntl();

  const options = _.map(items, (status) => {
    return {
      label: intl.formatMessage({ id: `orderstatus.select.${status}` }),
      value: status,
    };
  });

  function onChange(checkedValues: any) {
    props.onChange && props.onChange(checkedValues);
  }

  return (
    <Checkbox.Group
      {...props}
      options={options}
      onChange={onChange}
    ></Checkbox.Group>
  );
};
