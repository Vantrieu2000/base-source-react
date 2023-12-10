import { useQueryClient } from "react-query";
import { PermissionDto } from "../dto/permission.dto";


export function removeBeforeFirstUnderscore(str: string): string {
  const underscoreIndex = str?.indexOf('_');
  if (underscoreIndex === -1) {
    return str;
  }

  const keywords = ['create', 'read', 'delete', 'update'];
  const keyword = str.slice(0, underscoreIndex);
  
  if (keywords.includes(keyword)) {
    return str.slice(underscoreIndex + 1);
  }

  return str;
}

const checkPermissions = (ListPermission ,permission: string) => {
	if (permission === 'dashboard') {
		return true;
	} else {
		const listHandedPermission = ListPermission?.map((per) =>
			removeBeforeFirstUnderscore(per?.key)
		);
		return listHandedPermission.includes(permission);
	}
};

export const checkArrayPermissions = (ListPermission : any,permissions: string[]): boolean => {
  const allPermissions = [...ListPermission?.map(per => removeBeforeFirstUnderscore(per?.key)), 'dashboard'];
  return permissions.some(permission => allPermissions.includes(permission));
};

export function checkPermission(permissions: {id : string , key : string}[], permissionName: string): boolean {
  return permissions.some((permission) => permission.key === permissionName);
}

export default checkPermissions;

export const getOrderPermission = (listPermission : PermissionDto[], permissionName: string): number => {
  if(listPermission && listPermission.length > 0) {
    const findPermission = listPermission.find(x => x.key === permissionName)
    if(findPermission) {
      return findPermission.order
    } else {
      return 1
    }
  } else {
    return 1
  }
}
