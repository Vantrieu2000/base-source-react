export interface PromotionDto {
  id : string,
  content: string,
  storeId: string,
  title: string,
  imageUrl: string,
  goToUrl: string,
  order: number
  adType: string,
}

export interface CreatePromotionDto {
  content?: string,
  storeId?: string,
  title?: string,
  imageUrl?: string,
  goToUrl?: string,
  order?: number
  adType?: string,
}

export interface UpdatePromotionDto {
  id: string,
  content?: string,
  storeId?: string,
  title?: string,
  imageUrl?: string,
  goToUrl?: string,
  order?: number
  adType?: string,
}

export interface changeOrderDto {
  activeId: any,
  overId: any,
}