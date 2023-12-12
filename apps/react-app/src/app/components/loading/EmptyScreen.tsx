import { Empty } from 'antd';
import { useIntl } from 'react-intl';

export const EmptyScreen = (
  props: { failureCount?: number; height?: string; callback?: Function } = {
    failureCount: 0,
    height: '%',
    callback: () => {},
  }
) => {
  const intl = useIntl();
  const { callback, height } = props;
  return (
    <div
      className="d-flex flex-column w-100 justify-content-center align-items-center"
      style={{ height: `100${height}` }}
    >
      <Empty description={intl.formatMessage({ id: 'system.no-data' })} />
    </div>
  );
};
