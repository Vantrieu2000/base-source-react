export interface CreateStaffDto {
  storeId: string;
  id: string;
  name: string;
  email: string;
  level: string;
  status: string;
}

export interface GetListStaffDto {
  storeId: string;
  search?: string;
  limit?: number;
}

export interface StaffDto {
  id: string;
  email: string;
  name: string;
  accessLevel: string;
  status: string;
}

export interface EditStaffDto {
  storeIdOwner: string;
  staffId: string;
  name: string;
  level: string;
  status: string;
}

export interface DeleteStaffDto {
  id: string;
  email: string;
  storeId: string;
}
