import { FilterDto } from "./common.dto";

export interface CreateReservationDto {
  name: string;
}

export interface EditReservationDto {
  id : string;
  name: string;
}