import { customAxios } from ".";
import { CreateStoreDto, EditStoreDto } from "../dto/store.dto";

export const Store = {
  getListStore,
  deleteStore,
  getAllStores,
  createStore,
  getDetailStore,
  editStore,
};

/////// POST

async function createStore(payload: CreateStoreDto): Promise<any> {
  const response = await customAxios.post("store", {
    ...payload,
  });
  return response.data;
}

/////// GET

async function getListStore(payload: any): Promise<any> {
  const response = await customAxios.get("store", {
    params: payload,
  });
  return response.data.data;
}

async function getAllStores(payload: any): Promise<any> {
  const response = await customAxios.get("store", {
    params: { ...payload, isAll: true },
  });
  return response.data.data;
}

async function getDetailStore(id: string): Promise<any> {
  const response = await customAxios.get(`store/${id}`);
  return response.data.data;
}

//////// PUT

async function editStore(payload: EditStoreDto): Promise<any> {
  const response = await customAxios.put(`store/${payload.id}`, { ...payload });
  return response.data;
}

/////// DELETE

async function deleteStore(id: string): Promise<any> {
  const response = await customAxios.delete(`store/${id}`);
  return response.data;
}
