import { SelectProps } from 'antd';
import { useIntl } from 'react-intl';
import { BookingStatus } from '../../utils/enum/booking';
import CustomSelect from './CustomSelect';

interface BookingStatusSelectProps<T = any> extends SelectProps<T> {}

const BookingStatusSelect = <T extends any>(
  props: BookingStatusSelectProps<T>
) => {
  const intl = useIntl();

  return (
    <CustomSelect
      options={Object.keys(BookingStatus).map((key) => ({
        value: BookingStatus[key],
        label: intl.formatMessage({
          id: `pages.booking.status_${BookingStatus[key]}`,
        }),
      }))}
      className={`ant-custom-select ${props.className}`}
      {...props}
    />
  );
};

export default BookingStatusSelect;
