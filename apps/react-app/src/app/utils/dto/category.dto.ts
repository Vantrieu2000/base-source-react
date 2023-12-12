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

export interface reOrderCategoryDto {
  id: string;
  newOrder: number;
}

export interface DeleteCategoryDto {
  id: string;
  storeId: string;
}

export interface CategoryDto {
  _id: string;
  name: string;
  des?: string;
  storeId: string;
  userId: string;
  deleted?: boolean;
  createDate?: string;
  updateDate?: string;
}
