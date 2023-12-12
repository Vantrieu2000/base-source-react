export interface FilterDto {
  page: number;
  limit: number;
  search: string;
}

export interface FilterStoreDto {
  isAll : boolean;
  storeId: string;
}
export interface ContactFilterDto {
  page: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  isRead?: string;
}

export interface PostFilterDto {
  page: number;
  limit: number;
  highlighted?: string;
  visibility?: string;
  title?: string;
}

export interface FaqFilterDto {
  page: number;
  limit: number;
  search?: string;
}

export interface BranchAdminFilterDto {
  page?: number;
  limit?: number;
  search?: string;
  storeId?: string;
}

export interface TrainerReviewDto {
  page: number;
  limit?: number;
  trainerId?: string;
}