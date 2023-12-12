import { MenuOutlined, WechatOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { UserAvatar } from '../../../components/avatar';
import IconSVG from '../../../components/icons/Icons';
import { api } from '../../../utils/api';
import SettingMenu from './setting-menu/SettingMenu';

const Header = () => {
  const ref = useRef<any>();
  const intl = useIntl();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const id = localStorage.getItem('store_id');

  const { data } = useQuery(
    ['store-infomation', id],
    () => api.Store.getDetailStore(id!),
    {
      enabled: false,
    }
  );

  const UserType = {
    admin: intl.formatMessage({
      id: 'system.admin',
    }),
    branch_admin: intl.formatMessage({
      id: 'system.branch_admin',
    }),
  };

  const menuToggleHandler = () => {
    setIsShowMenu((current) => !current);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!ref.current?.contains(event?.target as Node)) {
      setIsShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const asideToggleHandler = () => {
    document.body.removeAttribute('data-kt-aside-minimize');
  };

  return (
    <div
      id="kt_header"
      style={{}}
      className="header align-items-stretch red-line"
    >
      <div className="container-fluid d-flex align-items-stretch justify-content-end">
        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1 w-100">
          <div className="user-info d-lg-none">
            <span>
              <MenuOutlined onClick={asideToggleHandler} />
            </span>
          </div>
          <div className="d-flex align-items-center" id="kt_header_nav">
            URL : {data?.url}
          </div>
          <div className="d-flex align-items-stretch flex-shrink-0">
            <div className="d-flex align-items-stretch flex-shrink-0">
              <div className="user-info">
                <span>
                  <WechatOutlined style={{ fontSize: '36px' }} />
                </span>
              </div>
              <div
                className="d-flex align-items-center ms-1 ms-lg-3"
                style={{ cursor: 'pointer' }}
                id="kt_header_user_menu_toggle"
                onClick={menuToggleHandler}
                ref={ref}
              >
                <div className="user-info">
                  <span>
                    <UserAvatar url={data && data.avatar} />
                  </span>
                  <div>
                    <div>{data && data.fullName}</div>
                    <div className="type">{data && UserType[data.type]}</div>
                  </div>
                  <IconSVG type="dropdown" />
                </div>
              </div>
              <SettingMenu show={isShowMenu}></SettingMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
