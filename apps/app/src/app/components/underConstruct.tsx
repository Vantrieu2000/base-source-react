import { useIntl } from 'react-intl';

export const UnderConstructScreen = () => {
  const intl = useIntl();
  return (
    <div
      className="d-flex flex-column w-100 justify-content-center align-items-center"
      style={{ height: `100%` }}
    >
      <img src="/assets/images/underconstruct.png" />
      <br />
      <div className="txt__huge text-center">
        {intl.formatMessage({ id: 'system.underconstruct' })}
      </div>
    </div>
  );
};
