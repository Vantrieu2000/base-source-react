import { injectIntl, WrappedComponentProps } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/enum/RouteConst";

type StoreItemProps = {
  store: any;
};

const StoreItem = (props: StoreItemProps & WrappedComponentProps) => {
  const { store } = props;
  const navigate = useNavigate();

  const handleSelectStore = () => {
    if (store && store.createdByStore) {
      localStorage.setItem("store_id", store.createdByStore);
      localStorage.setItem("staff_id", store._id);
    } else {
      localStorage.setItem("store_id", store._id);
      localStorage.removeItem("staff_id");
    }
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <div className="store-item">
      <div className="store-item__name">{props.store.name}</div>
      <div className="store-item__action" onClick={handleSelectStore}>
        {props.store?.position}
      </div>
    </div>
  );
};

export default injectIntl(StoreItem);
