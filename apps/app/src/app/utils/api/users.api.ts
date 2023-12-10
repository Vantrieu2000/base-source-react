import { customAxios } from '.';
import { BranchAdminFilterDto, FilterDto } from '../dto/common.dto';
import {
  AdminDto,
  CreateAdminDto,
  ResFetchUser,
  SearchUserDto,
  UpdateUserDto,
} from '../dto/users.dto';

export const User = {
  fetchList,
  removeAdmin,
  removeBranchAdmin,
  getListAdmin,
  getDetailUser,
  updateAdmin,
  createAdmin,
  getDetailCustomer,
  getDetailAdmin,
  updateBranchAdmin,
  getListBranchAdmin,
  getDetailBranchAdmin,
  createBranchAdmin,
  getAllBranchAdmin
};

/////// POST

async function createAdmin(payload : CreateAdminDto) : Promise<any> {
  const response = await customAxios.post('auth/register-admin', {
    ...payload,
  })
  return response.data;
}

async function createBranchAdmin(payload : CreateAdminDto) : Promise<any> {
  const response = await customAxios.post('user/branch-admin', {
    ...payload,
  })
  return response.data;
}


/////// GET

async function fetchList(payload: SearchUserDto): Promise<ResFetchUser> {
  const response = await customAxios.get('admin/get-all-toC', {
    params: { ...payload },
  });
  return response.data;
}

async function getListAdmin(payload : FilterDto): Promise<any> {
  const response = await customAxios.get(`/user/admin`, {params : payload});
  return response.data.data;
}

async function getListBranchAdmin(payload : BranchAdminFilterDto): Promise<any> {
  const response = await customAxios.get(`/user/branch-admin`, {params : payload});
  return response.data.data;
}

async function getAllBranchAdmin(): Promise<any> {
  const response = await customAxios.get(`/user/branch-admin`);
  return response.data.data;
}

async function getDetailUser(id : string ): Promise<AdminDto> {
  const response = await customAxios.get(`/user/${id}`);
  return response.data.data;
}

async function getDetailAdmin(id : string ): Promise<AdminDto> {
  const response = await customAxios.get(`/user/admin/${id}`);
  return response.data.data;
}

async function getDetailBranchAdmin(id : string ): Promise<AdminDto> {
  const response = await customAxios.get(`/user/branch-admin/${id}`);
  return response.data.data;
}

async function getDetailCustomer(id : string ): Promise<AdminDto> {
  const response = await customAxios.get(`user/customer/${id}`);
  return response.data.data;
}

/////// PUT

async function updateAdmin(payload : UpdateUserDto) : Promise<any> {
  const response = await customAxios.put(`user/admin/${payload.id}`, {
    ...payload,
  });
  return response.data;
}

async function updateBranchAdmin(payload : UpdateUserDto) : Promise<any> {
  const response = await customAxios.put(`user/branch-admin/${payload.id}`, {
    ...payload,
  });
  return response.data;
}

/////// DELETE

async function removeAdmin(id: string): Promise<any> {
  const response = await customAxios.delete(`user/admin/${id}`);
  return response.data;
}

async function removeBranchAdmin(id: string): Promise<any> {
  const response = await customAxios.delete(`user/branch-admin/${id}`);
  return response.data;
}
