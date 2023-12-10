export interface TrainerDto {}

export interface TrainerIdleDto {
  startDate: string;
  endDate: string;
  storeId: string;
  email: string;
}
export interface CreateTrainerDto {
  fullName: string;
  email: string;
  password: string;
}

export interface UpdateTrainerDto extends CreateTrainerDto {
  id: string;
}

export interface UpdateGelleryTrainerDto {
  trainerId: string;
  galleryId: string;
}

export interface UpdateAllGelleryTrainerDto {
  trainerId: string;
}

export interface TrainerIsNewDto {
  id: string;
  isNew: boolean;
}

export interface TrainerIsHotDto {
  id: string;
  isHot: boolean;
}

export interface CreateTrainerReviewDto {
  id?: string;
  trainerId: string;
  description: string;
  reviewer: string;
  skill: number;
  attitude: number;
  power: number;
  hospitality: number;
}

export interface ReviewDataProps {
  id: string;
  description?: string;
  key?: string;
  skill?: number;
  attitude?: number;
  power?: number;
  hospitality?: number;
  reviewer?: string;
  title?: string;
  trainerId?: string;
  userId?: string;
}

export interface TrainerRankingDataProps {
  sumRevenueNotSpecified: number;
  sumRevenueNotSpecifiedRatio?: number;
  sumBookingBag?: number;
  sumConsecutiveBooking?: number;
  sumConsecutiveBookingRatio?: number;
  sumIndividualOperatingRatio?: number;
  sumNewCustomer?: number;
  sumNewSale?: number;
  sumNewSaleRatio?: number;
  sumSpecifiedBooking?: number;
  sumUpdatedSale?: number;
  sumUpdatedSaleRatio?: number;
  sumWorkingTime?: number;
}
