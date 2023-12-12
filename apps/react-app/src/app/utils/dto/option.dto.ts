export interface CreateOptionDto {
  name: string;
  modifiers: {
    name: string;
    currency: number;
    status: boolean;
  }[];
  storeId: string;
}

export interface getOptionDto {
  store_id: string;
  search?: string;
}

export interface EditOptionDto {
  name: string;
  modifiers: {
    name: string;
    currency: number;
    status: boolean;
  }[];
  storeId: string;
  id: string;
}

export interface DeleteOptionDto {
  id: string;
  storeId: string;
}

export interface OptionDto {
  id: string;
  name: string;
  address?: string;
  city?: string;
  closeTime?: string;
  createDate?: string;
  createId?: string;
  deleteDate?: string;
  description?: string;
  district?: string;
  storeName: string;
  openTime?: string;
  phoneNumber?: string;
  province?: string;
  updateDate?: string;
  updateId?: string;
  normalTime?: string;
}
