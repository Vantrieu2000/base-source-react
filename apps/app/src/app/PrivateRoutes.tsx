/* eslint-disable react/jsx-no-useless-fragment */
import { lazy, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BasicLayout from "./layout/basic/BasicLayout";
import Page from "./layout/page";
import PassportLayout from "./layout/passport/Passwort";
import { api, ResponseError } from "./utils/api";
import { ROUTES } from "./utils/enum/RouteConst";

const SelectStore = lazy(() => import("./pages/select-store/StorePage"));
const Dashboard = lazy(() => import("./pages/dashboard/index"));
const StorePreference = lazy(
  () => import("./pages/store-preference/StorePreference")
);
const CreateQR = lazy(() => import("./pages/create-qr/CreateQR"));
const OpeningHours = lazy(() => import("./pages/opening-hours/OpeningHours"));
const CategorySetting = lazy(
  () => import("./pages/caterory-setting/CategorySetting")
);
const AddOptions = lazy(() => import("./pages/add-options/AddOptions"));
const MenuSetting = lazy(() => import("./pages/menu-setting/MenuSetting"));
const StaffRegistration = lazy(
  () => import("./pages/staff-registration/StaffRegistration")
);
const OrderList = lazy(() => import("./pages/order-list/OrderList"));
const AlertList = lazy(() => import("./pages/alert-list/AlertList"));
const Statistics = lazy(() => import("./pages/statistics/Statistics"));
const CustomerCenter = lazy(
  () => import("./pages/customer-center/CustomerCenter")
);

const routes = [
  {
    path: ROUTES.SELECT_STORE,
    component: SelectStore,
    name: "select_store",
  },
  {
    path: ROUTES.DASHBOARD,
    component: Dashboard,
    name: "dashboard",
  },
  {
    path: ROUTES.STORE_REFERENCES,
    component: StorePreference,
    name: "store_preferences",
  },
  {
    path: ROUTES.CREATE_QR,
    component: CreateQR,
    name: "create_qr",
  },
  {
    path: ROUTES.OPENING_HOURS,
    component: OpeningHours,
    name: "open_hours",
  },
  {
    path: ROUTES.CATEGORY_SETTING,
    component: CategorySetting,
    name: "category_setting",
  },
  {
    path: ROUTES.ADD_OPTIONS,
    component: AddOptions,
    name: "add_options",
  },
  {
    path: ROUTES.MENU_SETTING,
    component: MenuSetting,
    name: "menu_setting",
  },
  {
    path: ROUTES.STAFF_REGISTRATION,
    component: StaffRegistration,
    name: "staff_registration",
  },
  {
    path: ROUTES.ORDER_LIST,
    component: OrderList,
    name: "order_list",
  },
  {
    path: ROUTES.ALERT_LIST,
    component: AlertList,
    name: "alert_list",
  },
  {
    path: ROUTES.STATISTICS,
    component: Statistics,
    name: "statistics",
  },
  {
    path: ROUTES.CUSTOMER_CENTER,
    component: CustomerCenter,
    name: "customer_center",
  },
];

export const PrivateRoutes = () => {
  const queryClient = useQueryClient();
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const { pathname } = useLocation();
  const id = localStorage.getItem("store_id");

  // const { data, status } = useQuery('me', api.Auth.me, {
  //   onError(err: ResponseError) {
  //     if (err?.message === 'Unauthorized') {
  //       setIsTokenExpired(true);
  //     }
  //   },
  //   retry: 2,
  // });

  const { data, status } = useQuery(
    ["store-infomation", id],
    () => api.Store.getDetailStore(id!),
    {
      onError(err: ResponseError) {
        if (err?.message === "Unauthorized") {
          setIsTokenExpired(true);
        }
      },
    }
  );

  useEffect(() => {
    if (isTokenExpired) {
      logout();
      setIsTokenExpired(false);
    }
  }, [isTokenExpired]);

  function logout() {
    localStorage.removeItem("token");
    queryClient.invalidateQueries("token");
  }

  // if (status == 'loading') return <LoadingScreen height="vh" />;

  // if ((status == 'success' && !data) || status == 'error') {
  //   return <ErrorScreen height="vh" />;
  // }

  if (pathname === "/select-store") {
    return (
      <PassportLayout>
        <SelectStore />
      </PassportLayout>
    );
  }

  return (
    <BasicLayout>
      <Routes>
        {routes.map((config, index) => {
          const path = config.path;
          const Cpn = config.component;
          return (
            <Route
              path={path}
              element={<Page title={config.name} children={<Cpn />} />}
              key={index}
            />
          );
        })}

        {routes[0] && (
          <Route
            path="*"
            element={<Navigate replace={true} to={routes[0].path} />}
          />
        )}
      </Routes>
    </BasicLayout>
  );
};
