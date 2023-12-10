import { customAxios } from ".";
import {
  CreateOptionDto,
  DeleteOptionDto,
  EditOptionDto,
  getOptionDto,
} from "../dto/option.dto";

export const Option = {
  getListOption,
  getDetailOption,
  deleteOption,
  createOption,
  editOption,
};

/////// POST

async function createOption(payload: CreateOptionDto): Promise<any> {
  const response = await customAxios.post("option", {
    ...payload,
  });
  return response.data;
}

/////// GET

async function getListOption(payload: getOptionDto): Promise<any> {
  const response = await customAxios.get(`option/${payload.store_id}`, {
    params: { search: payload.search },
  });
  return response.data.data;
}

async function getDetailOption({ id }): Promise<any> {
  const response = await customAxios.get(`option/getOne/${id}`);
  return response.data;
}

//////// PUT

async function editOption(payload: EditOptionDto): Promise<any> {
  const response = await customAxios.put(`option/${payload.id}`, {
    ...payload,
  });
  return response.data;
}

/////// DELETE

async function deleteOption(payload: DeleteOptionDto): Promise<any> {
  const response = await customAxios.delete(`option`, {
    params: payload,
  });
  return response.data;
}
