import React, { FC, useEffect } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../AppRoutes";
import { useViewport } from "../../utils/functions/common";
// import MyBackgroundImage from './assets/images/common/background.png';

type PassportLayoutProps = {
  children: JSX.Element;
} & WrappedComponentProps;

const PassportLayout: FC<PassportLayoutProps> = (props) => {
  const { children, intl } = props;
  const { isSP } = useViewport();
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  const location = useLocation();
  const currentRoute = appRoutes.find((x) => x.path === location.pathname);

  return (
    <div
      className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
      style={{
        height: "100vh",
      }}
    >
      <div
        className={`d-flex flex-column flex-column-fluid passwort-container ${
          isSP ? "flex-start" : "flex-center justify-content-evenly"
        }`}
      >
        <div className="passwort-container__banner">
          <div className="passwort-container__banner__content">BANNER</div>
        </div>
        <div className={`bg-white p-10 p-lg-8 mx-4 passport-container`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(PassportLayout);
