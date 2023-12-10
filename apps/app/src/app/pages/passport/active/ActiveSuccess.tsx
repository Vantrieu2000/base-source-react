import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { injectIntl, useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/enum/RouteConst';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ResponseError, api } from '../../../utils/api';
import { CustomHandleError } from '../../../utils/api/responseHandler';
import { LoadingScreen } from '../../../components/loading/LoadingScreen';

export const ActiveAccount = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();;
  const [token, setToken] = useState<string>("")


  const { data, status } = useQuery(['active-account', token!], () => api.Auth.activeAccount({ token }), {
    onSuccess: (data) => {
    },
    enabled: !!token,
    onError: (error: ResponseError) => {
      CustomHandleError(error, intl);
    },
  });


  useEffect(() => {
    const token = location.pathname.split('/')[3]
    setToken(token)
  }, [location]);

  if (status === 'loading') {
    return <LoadingScreen />
  }

  return (
    status === 'success' ?
      <>
        <div className="passport-content">
          <div className="reset-success">
            <div className="reset-success-container">
              <div className="check-image">
                <img src={'/assets/images/common/check.png'} alt="check" />
              </div>
              <div className="d-flex flex-column success-text">
                <div className="form-forgot-title">
                  {intl.formatMessage({
                    id: 'pages.active-account.title',
                  })}
                </div>

              </div>
              <Button
                className="w-100"
                type="primary"
                size="large"
                style={{ marginTop: 25 }}
                onClick={() => navigate(ROUTES.LOGIN, { replace: true })}
              >
                {intl.formatMessage({
                  id: 'pages.login',
                })}
              </Button>
            </div>
          </div>
        </div>
      </> : <></>
  );
};


export default injectIntl(ActiveAccount);
