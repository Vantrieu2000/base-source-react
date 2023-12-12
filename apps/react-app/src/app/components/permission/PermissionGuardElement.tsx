import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';

interface AuthorizedProps {
  children: JSX.Element;
}

const AuthorizedElement: React.FC<AuthorizedProps> = ({ children }) => {
  const store_id = localStorage.getItem('store_id')!;
  const staff_id = localStorage.getItem('staff_id')!;

  const getDataId = staff_id ? staff_id : store_id;

  const { data: store, status } = useQuery(
    ['store-infomation', getDataId],
    () => api.Store.getDetailStore(getDataId!),
    {
      enabled: !!getDataId,
    }
  );

  const [isAuthorized, setAuthorized] = useState<boolean>(true);

  useEffect(() => {
    if (store) {
      setAuthorized(store?.position === 'owner' || store?.position === 'admin');
    }
  }, [store]);

  return <>{isAuthorized && children}</>;
};

export default AuthorizedElement;
