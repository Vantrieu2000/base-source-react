import { CloseCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQueryClient } from '@tanstack/react-query';
import { MeDto, StoreDto } from '../../../utils/dto/auth.dto';
import { useViewport } from '../../../utils/functions/common';
import { AsideMenu } from './AsideMenu';

const Aside = () => {
  const intl = useIntl();
  const asideRef = useRef(null);
  const queryClient = useQueryClient();
  const id = localStorage.getItem('store_id');
  const [state, setState] = useState({ minimize: false, animating: false });

  const store: StoreDto | undefined = queryClient.getQueryData([
    'store-infomation',
    id,
  ]);

  const { isTablet, isSP } = useViewport();

  useEffect(() => {
    if (isTablet || isSP) {
      setState({ minimize: true, animating: false });
      document.body.setAttribute('data-kt-aside-minimize', 'on');
    } else {
      document.body.removeAttribute('data-kt-aside-minimize');
    }
  }, [isTablet, isSP]);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    queryClient.invalidateQueries(['token']);
    queryClient.invalidateQueries(['isLogin']);
  }

  const closeSideBar = () => {
    setState({ minimize: true, animating: true });
    document.body.setAttribute('data-kt-aside-minimize', 'on');
  };

  return (
    <div
      id="kt_aside"
      ref={asideRef}
      className={clsx('aside aside-light aside-hoverable', {
        animating: state.minimize && state.animating,
      })}
      data-kt-drawer="true"
      data-kt-drawer-name="aside"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_aside_mobile_toggle"
    >
      <div className="aside-logo flex-column-auto " id="kt_aside_logo">
        {!isTablet ? (
          <div className="store-info">{store?.name}</div>
        ) : (
          <div
            id="kt_aside_toggle"
            className={clsx(
              'btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle',
              { active: state.minimize }
            )}
            data-kt-toggle="true"
            data-kt-toggle-state="active"
            data-kt-toggle-target="body"
            data-kt-toggle-name="aside-minimize"
            style={{
              right: '20px',
              position: 'absolute',
            }}
          >
            <DoubleRightOutlined />
          </div>
        )}
        {isSP && (
          <CloseCircleOutlined
            onClick={closeSideBar}
            style={{
              fontSize: '24px',
              position: 'absolute',
              right: '20px',
              color: '#838383',
            }}
          />
        )}
      </div>

      <AsideMenu></AsideMenu>
      {/* <div className="logout">
        <div className="logout-container" onClick={logout}>
          <div className="logout-container_logo">
            <img src="./assets/images/icons/icon_logout.svg" />
          </div>
          <div className="logout-container_text">
            {intl.formatMessage({ id: 'menu.signout' })}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Aside;
