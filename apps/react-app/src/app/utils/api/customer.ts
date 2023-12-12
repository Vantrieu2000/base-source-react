import { customAxios } from ".";
import {
  CreateQuestionDto,
  DeleteQuestionDto,
  EditQuestionDto,
  GetListQuestionDto,
} from "../dto/customer.dto";

export const Customer = {
  getListQuestion,
  getDetailQuestion,
  deleteQuestion,
  createQuestion,
  editQuestion,
};

/////// POST

async function createQuestion(payload: CreateQuestionDto): Promise<any> {
  const response = await customAxios.post("customer", {
    ...payload,
  });
  return response.data;
}

/////// GET

async function getListQuestion(payload: GetListQuestionDto): Promise<any> {
  const response = await customAxios.get(`customer`, {
    params: { ...payload },
  });
  return response.data;
}

async function getDetailQuestion(id: string): Promise<any> {
  const response = await customAxios.get(`customer/${id}`);
  return response.data.data;
}

//////// PUT

async function editQuestion(payload: EditQuestionDto): Promise<any> {
  const response = await customAxios.put(`customer/${payload.level}`, {
    //need to edit
    ...payload,
  });
  return response.data;
}

/////// DELETE

async function deleteQuestion(payload: DeleteQuestionDto[]): Promise<any> {
  const response = await customAxios.delete(`customer`, {
    params: { customerItems: payload },
  });
  return response.data;
}
