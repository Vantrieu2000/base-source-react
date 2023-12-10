import { WrappedComponentProps, injectIntl, useIntl } from 'react-intl';
import CustomButton from '../../../components/button/SubmitButton';
import StoreItem from './StoreItem';
import { useQuery } from 'react-query';
import { api } from '../../../utils/api';
import { LoadingScreen } from '../../../components/loading/LoadingScreen';

type StoreItemProps = {
    setComponent: React.Dispatch<React.SetStateAction<number>>
}

const SelectStore = (props: StoreItemProps & WrappedComponentProps) => {
    const intl = useIntl();

    const { data, status } = useQuery("list-store", api.Store.getListStore);

    if (status === 'loading') return <LoadingScreen />

    return (
        <div className="select-store__container">
            <div className='select-store__container__title'>
                {intl.formatMessage({
                    id: 'pages.select-store.title',
                })}
            </div>
            <div className='select-store__container__registration'>
                <CustomButton
                    type='primary'
                    onClick={() => { props.setComponent(2) }}>
                    {intl.formatMessage({ id: "pages.select-store.registration_placeholder" })}
                </CustomButton>

            </div>
            <div className='select-store__container__store'>
                <ul>
                    {
                        data.map((store) => (
                            <li key={store?._id}><StoreItem id={store?._id} name={store?.name} type={store.position} /></li>))
                    }
                </ul>
            </div>

        </div>
    );
};

export default injectIntl(SelectStore);
