import React from 'react';
import { useIntl } from 'react-intl';

const NoPermission = () => {
  const intl = useIntl();

  return (
    <div className="no-permission">
      {intl.formatMessage({ id: 'system.no_permission' })}
    </div>
  );
};

export default NoPermission;
