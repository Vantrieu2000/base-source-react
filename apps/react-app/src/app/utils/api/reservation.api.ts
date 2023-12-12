import { customAxios } from '.';
import { FilterDto } from '../dto/common.dto';
import {
  CreateReservationDto,
  EditReservationDto,
} from '../dto/reservation.dto';

export const Reservation = {
  createReservation,
  getListReservation,
  editReservation,
  deleteReservation,
};

/////// POST

async function createReservation(payload: CreateReservationDto): Promise<any> {
  const response = await customAxios.post('reservation', {
    ...payload,
  });
  return response.data;
}

/////// GET

async function getListReservation(payload: FilterDto): Promise<any> {
  const response = await customAxios.get('reservation', {params : payload});
  return response.data.data;
}

//////// PUT

async function editReservation(payload: EditReservationDto): Promise<any> {
  const response = await customAxios.put(`reservation/${payload.id}`, {
    ...payload,
  });
  return response.data;
}

/////// DELETE

async function deleteReservation(id: string): Promise<any> {
  const response = await customAxios.delete(`reservation/${id}`);
  return response.data;
}
