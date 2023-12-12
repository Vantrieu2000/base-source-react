import { customAxios } from ".";
import {
  CreateStaffDto,
  DeleteStaffDto,
  EditStaffDto,
  GetListStaffDto,
} from "../dto/staff.dto";

export const Staff = {
  getListStaff,
  getDetailStaff,
  deleteStaff,
  createStaff,
  editStaff,
  searchStaff,
};

/////// POST

async function createStaff(payload: CreateStaffDto): Promise<any> {
  const response = await customAxios.post("staff", {
    ...payload,
  });
  return response.data;
}

/////// GET

async function getListStaff(payload: GetListStaffDto): Promise<any> {
  const response = await customAxios.get(`staff`, {
    params: { ...payload },
  });
  return response.data.data;
}

async function getDetailStaff(id: string): Promise<any> {
  const response = await customAxios.get(`staff/findOne`, {
    params: { id },
  });
  return response.data;
}

async function searchStaff(id: string): Promise<any> {
  const response = await customAxios.get(`auth/findOne`, {
    params: { id: id },
  });
  return response.data;
}

//////// PUT

async function editStaff(payload: EditStaffDto): Promise<any> {
  const response = await customAxios.put(`staff/${payload.staffId}`, {
    ...payload,
  });
  return response.data;
}

/////// DELETE

async function deleteStaff(payload: DeleteStaffDto): Promise<any> {
  const response = await customAxios.delete(`staff/${payload.id}`, {
    params: { email: payload.email, storeId: payload.storeId },
  });
  return response.data;
}
