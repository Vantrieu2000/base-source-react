import { SelectProps } from 'antd';
import { useIntl } from 'react-intl';
import { StatusCustomer } from '../../utils/enum/user';
import CustomSelect from './CustomSelect';

interface StatusSelectProps<T = any> extends SelectProps<T> {}

const StatusSelect = <T extends any>(props: StatusSelectProps<T>) => {
  const intl = useIntl();
  return (
    <CustomSelect
      options={[
        {
          value: StatusCustomer.ACTIVE,
          label: intl.formatMessage({
            id: `system.active`,
          }),
        },
        {
          value: StatusCustomer.INACTIVE,
          label: intl.formatMessage({
            id: `system.inactive`,
          }),
        },
      ]}
      className={`ant-custom-select ${props.className}`}
      {...props}
    />
  );
};

export default StatusSelect;
