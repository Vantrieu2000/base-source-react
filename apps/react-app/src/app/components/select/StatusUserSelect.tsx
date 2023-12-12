import { SelectProps } from 'antd';
import { useIntl } from 'react-intl';
import { StatusCustomer } from '../../utils/enum/user';
import CustomSelect from './CustomSelect';

interface StatusUserSelectProps<T = any> extends SelectProps<T> {}

const StatusUserSelect = <T extends any>(props: StatusUserSelectProps<T>) => {
  const intl = useIntl();
  return (
    <CustomSelect
      options={[
        {
          value: '',
          label: intl.formatMessage({
            id: `system.all`,
          }),
        },
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
        {
          value: StatusCustomer.FIRST_LOGIN,
          label: intl.formatMessage({
            id: `system.first_login`,
          }),
        },
      ]}
      className={`ant-custom-select ${props.className}`}
      {...props}
    />
  );
};

export default StatusUserSelect;
