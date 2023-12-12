import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import CustomButton from '../../../components/button/SubmitButton';
import { LoadingScreen } from '../../../components/loading/LoadingScreen';
import { api } from '../../../utils/api';
import StoreItem from './StoreItem';

type StoreItemProps = {
  setComponent: React.Dispatch<React.SetStateAction<number>>;
};

const SelectStore = (props: StoreItemProps & WrappedComponentProps) => {
  const intl = useIntl();

  const { data, status } = useQuery(['list-store'], api.Store.getListStore);

  if (status === 'loading') return <LoadingScreen />;

  return (
    <div className="select-store__container">
      <div className="select-store__container__title">
        {intl.formatMessage({
          id: 'pages.select-store.title',
        })}
      </div>
      <div className="select-store__container__registration">
        <CustomButton
          type="primary"
          onClick={() => {
            props.setComponent(2);
          }}
        >
          {intl.formatMessage({
            id: 'pages.select-store.registration_placeholder',
          })}
        </CustomButton>
      </div>
      <div className="select-store__container__store">
        <ul>
          {data?.map((store) => (
            <li key={store?._id}>
              <StoreItem store={store} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default injectIntl(SelectStore);
