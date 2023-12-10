export interface PermissionDto {
  key: string;
  id : string;
  order: number;
}

export interface UpdatePermissionDto {
  id : string;
  name : string;
  permissionIds: PermissionDto[]
}

export interface CreatePermissionDto {
  name : string;
  permissionIds: PermissionDto[]
}