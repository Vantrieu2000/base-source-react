import { customAxios } from ".";
import {
  CreateMenuDto,
  DeleteMenuDto,
  EditMenuDto,
  GetListMenuDto,
  reOrderMenuDto,
} from "../dto/menu.dto";

export const Menu = {
  getListMenuByCategory,
  getDetailMenu,
  deleteMenu,
  createMenu,
  editMenu,
  copyMenu,
  reOrderMenu,
};

/////// POST

async function createMenu(payload: CreateMenuDto[]): Promise<any> {
  const response = await customAxios.post("menu", {
    ...payload,
  });
  return response.data;
}

async function copyMenu(payload: CreateMenuDto[]): Promise<any> {
  const response = await customAxios.post("menu/copy", {
    ...payload,
  });
  return response.data;
}

/////// GET

async function getListMenuByCategory(payload: GetListMenuDto): Promise<any> {
  const response = await customAxios.get(`menu`, {
    params: { ...payload },
  });
  return response.data.data;
}

async function getDetailMenu(id: string): Promise<any> {
  const response = await customAxios.get(`menu/${id}`);
  return response.data;
}

//////// PUT

async function editMenu(payload: EditMenuDto): Promise<any> {
  const response = await customAxios.put(`menu`, {
    ...payload,
  });
  return response.data;
}

async function reOrderMenu(payload: reOrderMenuDto): Promise<any> {
  const response = await customAxios.put(`menu/update-orders`, {
    ...payload,
  });
  return response.data;
}

/////// DELETE

async function deleteMenu(payload: DeleteMenuDto): Promise<any> {
  const response = await customAxios.delete(`menu`, {
    params: payload,
  });
  return response.data;
}
