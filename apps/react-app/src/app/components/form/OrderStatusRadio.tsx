/* eslint-disable @typescript-eslint/ban-types */
import * as API from '@react-app/services';
import { Radio, RadioGroupProps } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

export const OrderStatusRadio = (props: RadioGroupProps) => {
  const items = [
    API.OrderDtoOrderStatusEnum.Unresolved,
    API.OrderDtoOrderStatusEnum.Delivered,
  ];
  const intl = useIntl();
  return (
    <Radio.Group {...props}>
      {items.map((status) => {
        return (
          <Radio key={status} value={status}>
            {intl.formatMessage({ id: `orderstatus.select.${status}` })}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};
