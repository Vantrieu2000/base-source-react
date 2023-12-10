import { WrappedComponentProps, injectIntl, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/enum/RouteConst';

type StoreItemProps = {
    name: string;
    type: string;
    id: string;
}

const StoreItem = (props: StoreItemProps & WrappedComponentProps) => {
    const intl = useIntl();
    const navigate = useNavigate();

    const handleSelectStore = () => {
        localStorage.setItem('store_id', props.id)
        navigate(ROUTES.DASHBOARD, { replace: true })
    }

    return (
        <div className="store-item">
            <div className="store-item__name">{props.name}</div>
            <div className="store-item__action" onClick={handleSelectStore}>{props.type}</div>
        </div>
    );
};

export default injectIntl(StoreItem);
