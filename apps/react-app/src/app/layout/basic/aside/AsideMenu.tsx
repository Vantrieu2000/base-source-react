import {
  AlertOutlined,
  BarChartOutlined,
  CustomerServiceOutlined,
  FieldTimeOutlined,
  FileAddOutlined,
  HomeOutlined,
  PicCenterOutlined,
  QrcodeOutlined,
  SettingOutlined,
  TransactionOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { api } from '../../../utils/api';
import { ROUTES } from '../../../utils/enum/RouteConst';
import { AsideMenuItem } from './AsideMenuItem';

const items = [
  {
    key: 1,
    icon: <HomeOutlined />,
    label: 'aside.dashboard',
    path: ROUTES.DASHBOARD,
    permission: ['manager', 'owner', 'staff', 'admin'],
  },
  {
    key: 2,
    icon: <QrcodeOutlined />,
    label: 'aside.store_reference',
    path: ROUTES.STORE_REFERENCES,
    permission: ['owner', 'admin'],
  },
  {
    key: 3,
    icon: <QrcodeOutlined />,
    label: 'aside.create_qr',
    path: ROUTES.CREATE_QR,
    permission: ['owner', 'admin'],
  },
  {
    key: 4,
    icon: <FieldTimeOutlined />,
    label: 'aside.opening_hours',
    path: ROUTES.OPENING_HOURS,
    permission: ['owner', 'admin'],
  },
  {
    key: 5,
    icon: <PicCenterOutlined />,
    label: 'aside.category_settings',
    path: ROUTES.CATEGORY_SETTING,
    permission: ['manager', 'owner', 'admin'],
  },
  {
    key: 6,
    icon: <FileAddOutlined />,
    label: 'aside.add_options',
    path: ROUTES.ADD_OPTIONS,
    permission: ['manager', 'owner', 'admin'],
  },
  {
    key: 7,
    icon: <SettingOutlined />,
    label: 'aside.menu_settings',
    path: ROUTES.MENU_SETTING,
    permission: ['manager', 'owner', 'admin'],
  },
  {
    key: 8,
    icon: <UserAddOutlined />,
    label: 'aside.staff_registration',
    path: ROUTES.STAFF_REGISTRATION,
    permission: ['manager', 'owner', 'admin'],
  },
  {
    key: 9,
    icon: <TransactionOutlined />,
    label: 'aside.order_list',
    path: ROUTES.ORDER_LIST,
    permission: ['manager', 'owner', 'staff', 'admin'],
  },
  {
    key: 10,
    icon: <AlertOutlined />,
    label: 'aside.alert_list',
    path: ROUTES.ALERT_LIST,
    permission: ['manager', 'owner', 'staff', 'admin'],
  },
  {
    key: 11,
    icon: <BarChartOutlined />,
    label: 'aside.statistics',
    path: ROUTES.STATISTICS,
    permission: ['owner', 'admin'],
  },
  {
    key: 12,
    icon: <CustomerServiceOutlined />,
    label: 'aside.customer_center',
    path: ROUTES.CUSTOMER_CENTER,
    permission: ['owner', 'admin'],
  },
];

export const AsideMenu = () => {
  const location = useLocation();
  const [itemActive, setItemActive] = useState(-1);
  const store_id = localStorage.getItem('store_id')!;
  const staff_id = localStorage.getItem('staff_id')!;

  const getDataId = staff_id ? staff_id : store_id;

  const { data: store, status } = useQuery(
    ['store-infomation', getDataId],
    () => api.Store.getDetailStore(getDataId!),
    {
      enabled: !!getDataId,
    }
  );

  return (
    <Scrollbars
      renderTrackVertical={(props) => (
        <div
          {...props}
          style={{ display: 'none' }}
          className="track-horizontal"
        />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div {...props} style={{ ...style, backgroundColor: '#41416e' }} />
      )}
    >
      <div className="aside-menu flex-column-fluid">
        <div className="hover-scroll-overlay-y">
          <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500">
            {items
              .filter((i) =>
                i.permission.includes(store?.position.toLowerCase())
              )
              .map((item, index) => (
                <AsideMenuItem
                  key={index}
                  active={
                    item.path
                      ? location.pathname.includes(item.path)
                      : itemActive === index
                  }
                  item={item}
                  onClick={() => {
                    itemActive === index
                      ? setItemActive(-1)
                      : setItemActive(index);
                  }}
                ></AsideMenuItem>
              ))}
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};
