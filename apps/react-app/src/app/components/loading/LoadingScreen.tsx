import { Spin } from 'antd';
import { useIntl } from 'react-intl';

export const LoadingScreen = (
  props: { failureCount?: number; height?: string } = {
    failureCount: 0,
    height: '%',
  }
) => {
  const { failureCount, height } = props;
  const intl = useIntl();
  return (
    <div
      className="d-flex flex-column w-100 justify-content-center align-items-center"
      style={{ height: `100${height}` }}
    >
      <Spin
        indicator={
          <img
            src="/assets/images/loading.svg"
            style={{ width: 128, height: 128 }}
          />
        }
      />
      {!!failureCount && (
        <div className={`text-center system-retry-${failureCount}`}>
          {intl.formatMessage({ id: 'system.retry' }, { fail: failureCount })}
        </div>
      )}
    </div>
  );
};
