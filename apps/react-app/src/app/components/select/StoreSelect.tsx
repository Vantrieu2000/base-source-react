import { SelectProps } from 'antd';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';
import CustomSelect from './CustomSelect';

interface StoreSelectProps<T = any> extends SelectProps<T> {}

const StoreSelect = <T extends any>(props: StoreSelectProps<T>) => {
  //handle get Store
  const { data: store } = useQuery(['store'], api.Store.getAllStores);

  const intl = useIntl();
  return (
    <CustomSelect
      options={store?.data?.map((store) => ({
        value: store.id,
        label: intl.formatMessage({ id: store.name }),
      }))}
      className={`ant-custom-select ${props.className}`}
      {...props}
    />
  );
};

export default StoreSelect;
