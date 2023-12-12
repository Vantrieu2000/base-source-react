import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { ColorPallete } from '../../App';

export const ErrorScreen = (
  props: { failureCount?: number; height?: string, callback?: Function } = {
    failureCount: 0,
    height: '%',
    callback: () => {}
  }
) => {
  const intl = useIntl();
  const { callback, height } = props;
  return (
    <div
      className="d-flex flex-column w-100 justify-content-center align-items-center"
      style={{ height: `100${height}` }}
    >
      <ExclamationCircleOutlined
        style={{ fontSize: 128, color: ColorPallete.PRIMARY }}
      />
      <br />
      <div className="txt__huge text-center">
        {intl.formatMessage({ id: 'system.error' })}
        <Link to="/" onClick={() => callback && callback()}>
          {intl.formatMessage({ id: 'system.error.go_back' })}
        </Link>
      </div>
    </div>
  );
};
