import clsx from "clsx";
import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../utils/enum/RouteConst";

type Props = {
  show?: boolean;
};

const SettingMenu: React.FC<Props> = (props) => {
  const intl = useIntl();

  const ref: any = useRef();

  const queryClient = useQueryClient();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("store_id");
    localStorage.removeItem("isLogin");
    queryClient.invalidateQueries("token");
    queryClient.invalidateQueries("isLogin");
  }

  return (
    <div
      className={clsx(
        "setting-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold fs-6 w-170px",
        { show: props.show }
      )}
    >
      <Link to={ROUTES.PROFILE} className="menu-item menu-header px-5">
        <span className="menu-link px-5">
          {intl.formatMessage({ id: "system.profile" })}
        </span>
      </Link>
      <div className="menu-item menu-header px-5">
        <Link to={ROUTES.SELECT_STORE}>
          <span className="menu-link px-5">Change Store</span>
        </Link>
      </div>
      <div className="menu-item menu-header px-5" onClick={logout}>
        <span className="menu-link px-5">
          {intl.formatMessage({ id: "menu.signout" })}
        </span>
      </div>
    </div>
  );
};

export default SettingMenu;
