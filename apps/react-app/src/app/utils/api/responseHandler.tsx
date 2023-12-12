import { notification } from 'antd';
import { IntlShape } from 'react-intl';
import { ResponseError } from '.';

const durationCalc = (length: number) => Math.min(10, Math.round(length / 2));
const placement = 'top';

export function CustomHandleError(error: ResponseError, intl: IntlShape) {
  let message = intl.formatMessage({
    id: `error.${(error.error || '').replace(/\s/g, '_').toUpperCase()}`,
  });
  let description = intl.formatMessage({
    id: `error.msg.${(error.message || '').replace(/\s/g, '_').toUpperCase()}`,
  });

  let duration = durationCalc(message.length + description.length);

  notification.error({
    message: <span className='notify-error'>{message}</span>,
    description,
    placement,
    duration,
  });
}

export interface SuccessNotification {
  message: string;
  description: string;
}

export function CustomHandleSuccess(
  payload: SuccessNotification,
  intl: IntlShape
) {
  let message = intl.formatMessage({
    id: `success.${(payload.message || '').replace(/\s/g, '_').toUpperCase()}`,
  });
  let description = intl.formatMessage({
    id: `success.msg.${(payload.description || '').replace(/\s/g, '_').toUpperCase()}`,
  });

  let duration = durationCalc(message.length + description.length);
  notification.success({
    message: <span className='notify-success'>{message}</span>,
    description,
    placement,
    duration,
  });
}
