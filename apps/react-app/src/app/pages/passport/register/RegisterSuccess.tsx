import { Button } from 'antd';
import { injectIntl, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/enum/RouteConst';

export const RegisterSuccess = () => {
    const intl = useIntl();
    const navigate = useNavigate();

    return (
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
                                    id: 'pages.register-success.noitice',
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
        </>
    );
};


export default injectIntl(RegisterSuccess);
