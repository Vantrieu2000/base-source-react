import React from 'react';
import * as _ from 'lodash';
interface Props {
  value?: string | number;
  type?: 'string' | 'number';
}

export const PlainText = (props: Props) => {
  let value = props.value;

  if (_.isNull(props.value)) {
    return <span>-</span>;
  }

  if (typeof value === 'number' && isNaN(props.value as number)) {
    return <span>-</span>;
  }

  value = value === undefined ? '' : value;
  value += '';

  if (props.type === 'number') {
    value = value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-';
  }

  return <span>{value}</span>;
};
