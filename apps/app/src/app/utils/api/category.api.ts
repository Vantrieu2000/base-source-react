import { customAxios } from ".";
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  EditCategoryDto,
} from "../dto/category.dto";

export const Category = {
  getListCategory,
  getDetailCategory,
  deleteCategory,
  createCategory,
  editCategory,
};

/////// POST

async function createCategory(payload: CreateCategoryDto): Promise<any> {
  const response = await customAxios.post("category", {
    ...payload,
  });
  return response.data;
}

/////// GET

async function getListCategory(id: string): Promise<any> {
  const response = await customAxios.get(`category/${id}`);
  return response.data.data;
}

async function getDetailCategory({ id }): Promise<any> {
  const response = await customAxios.get(`category/getOne/${id}`);
  return response.data;
}

//////// PUT

async function editCategory(payload: EditCategoryDto): Promise<any> {
  const response = await customAxios.put(`category/${payload.id}`, {
    ...payload,
  });
  return response.data;
}

/////// DELETE

async function deleteCategory(payload: DeleteCategoryDto): Promise<any> {
  const response = await customAxios.delete(`category`, {
    params: payload,
  });
  return response.data;
}
