import React from "react";
import NoPermission from "./NoPermission";

interface Permission {
  name: string;
  role: string;
}

interface AuthorizedProps {
  permissions?: Permission[];
  fallback?: JSX.Element;
  children: JSX.Element;
}

const Authorized: React.FC<AuthorizedProps> = ({
  permissions = [],
  fallback = <NoPermission />,
  children,
}) => {
  // const queryClient = useQueryClient();
  // const user: MeDto | undefined = queryClient.getQueryData('me');
  // const userPermissions = user?.permissions.map((x) => x.key);
  // const isAuthorized = permissions.every((permission) =>
  //   userPermissions?.includes(permission.role)
  // );

  // return <>{isAuthorized ? children : fallback}</>;
  return <></>;
};

export default Authorized;
