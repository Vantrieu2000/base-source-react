export interface CreateStoreDto {
  name: string;
  url: string;
  position: string;
  email: string;
}

export interface EditStoreDto {
  id: string;
}

export interface StoreDto {
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
