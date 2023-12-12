import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PERMISSION_CONSTANTS } from '../utils/constants/ConstantValue';
import { StoreProfile } from '../utils/dto/store.dto';

const Page = (props: {
  children: JSX.Element;
  title?: string;
  permission?: string;
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const staff_id = localStorage.getItem('staff_id')!;

  const store: StoreProfile | undefined = queryClient.getQueryData([
    'store-infomation',
    staff_id,
  ])!;

  const userPermissions = PERMISSION_CONSTANTS[store?.position];

  // useEffect(() => {
  //   if (store && userPermissions) {
  //     if (!userPermissions.includes(props.title)) {
  //       navigate(ROUTES.DASHBOARD);
  //     }
  //   }
  // }, [props.title, store]);

  useEffect(() => {
    document.title =
      (props.title
        ? `${intl.formatMessage({ id: `title.${props.title}` })} - `
        : '') + intl.formatMessage({ id: 'project.name' });

    return () => {
      document.title = intl.formatMessage({ id: 'project.name' });
    };
  }, [props.title]);
  return props.children;
};

export default Page;
