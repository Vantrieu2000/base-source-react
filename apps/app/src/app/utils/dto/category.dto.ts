export interface CreateCategoryDto {
  name: string;
  des: string;
  userId: string;
}

export interface EditCategoryDto {
  id: string;
  name: string;
  des: string;
}

export interface DeleteCategoryDto {
  id: string;
  storeId: string;
}

export interface CategoryDto {
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
