export interface CreateMenuDto {
  menuItems: MenuDto[];
}

export interface GetListMenuDto {
  storeId: string;
  categoryId: string;
  categoryName: string;
  search?: string;
  limit: number;
}

export interface MenuDto {
  storeId: string;
  category: string;
  categoryId: string;
  name: string;
  des?: string;
  price: number;
  ingredientWarning: string;
  ingredient: string;
  origin: string;
  labels: string;
  spicyUnit: string;
  target: string;
  soldOutSign: boolean;
  options: string[];
  photo: string;
}

export interface EditMenuDto {
  id: string;
  name: string;
  des: string;
}

export interface DeleteMenuDto {
  menuItems: { id: string; storeId: string }[];
}

export interface MenuDto {
  _id: string;
  name: string;
  des?: string;
  storeId: string;
  userId: string;
  deleted?: boolean;
  createDate?: string;
  updateDate?: string;
}

export interface reOrderMenuDto {
  id: string;
  newOrder: number;
}
