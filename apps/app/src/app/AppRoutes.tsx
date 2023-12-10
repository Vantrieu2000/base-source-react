/* eslint-disable react/jsx-no-useless-fragment */
import { useQuery } from 'react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadingScreen } from './components/loading/LoadingScreen';
import Page from './layout/page';
import PassportLayout from './layout/passport/Passwort';
import { SpinScreen } from './layout/spin-screen/SpinScreen';
import ForgotPassword from './pages/passport/forgot-password/ForgotPassword';
import { ResetPasswordSuccess } from './pages/passport/forgot-password/ResetPassword_Success';
import { PrivateRoutes } from './PrivateRoutes';
import { getLogin, getToken } from './utils/api';
import { ROUTES } from './utils/enum/RouteConst';
import { Suspense, lazy } from 'react';

const Register = lazy(() => import('./pages/passport/register/Register'))
const Login = lazy(() => import('./pages/passport/login/Login'))
const ActiveAccount = lazy(() => import('./pages/passport/active/ActiveSuccess'))
const RegisterSuccess = lazy(() => import('./pages/passport/register/RegisterSuccess'))
const ForgotPasswordNoitice = lazy(() => import('./pages/passport/forgot-password/ForgotPassNoitice'))
const ResetPassword = lazy(() => import('./pages/passport/forgot-password/ResetPassword'))

export const appRoutes = [
  {
    path: ROUTES.LOGIN,
    permission: 'login',
    name: 'login',
    component: Login,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    permission: 'forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
  },
  {
    path: ROUTES.REGISTER,
    permission: 'register',
    name: 'register',
    component: Register,
  },
  {
    path: ROUTES.REGISTER_SUCCESS,
    permission: 'register',
    name: 'register-success',
    component: RegisterSuccess,
  },
  {
    path: ROUTES.ACTIVE_ACCOUNT,
    permission: 'active-account',
    name: 'active-account',
    component: ActiveAccount,
  },
  {
    path: ROUTES.FORGOT_PASSWORD_NOITICE,
    permission: 'reset-password-noitice',
    name: 'reset-password-noitice',
    component: ForgotPasswordNoitice,
  },
  {
    path: ROUTES.CHANGE_PASSWORD_SUCCESS,
    permission: 'reset-password.success',
    name: 'reset-password.success',
    component: ResetPasswordSuccess,
  },
  {
    path: ROUTES.VERIFY_FORGOT_PASSWORD,
    permission: 'change-password',
    name: 'change-password',
    component: ResetPassword,
  },
];

export const AppRoutes = () => {
  const { data, status } = useQuery('token', getToken);
  const { data: isLogin } = useQuery('isLogin', getLogin);

  if (status == 'loading') return <LoadingScreen height="vh" />;

  return (
    <Suspense fallback={<></>}>
      <SpinScreen>
        {data ? (
          <PrivateRoutes></PrivateRoutes>
        ) : (
          <PassportLayout>
            <Routes>
              {appRoutes.map((config, index) => {
                const path = config.path;
                const Cpn = config.component;
                return (
                  <Route
                    path={path}
                    element={<Page title={config.name} permission={config.permission} children={<Cpn />} />}
                    key={index}
                  />
                );
              })}

              {appRoutes[0] && (
                <Route
                  path="*"
                  element={<Navigate replace={true} to={appRoutes[0].path} />}
                />
              )}
            </Routes>
          </PassportLayout>
        )}
      </SpinScreen>
    </Suspense>
  );
};
