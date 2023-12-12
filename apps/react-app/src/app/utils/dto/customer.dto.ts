export interface CreateQuestionDto {
  storeId: string;
  title: string;
  content: string;
}

export interface GetListQuestionDto {
  storeId: string;
  search?: string;
  limit?: number;
}

export interface QuestionDto {
  id: string;
  email: string;
  name: string;
  accessLevel: string;
  status: string;
}

export interface EditQuestionDto {
  storeIdOwner: string;
  staffId: string;
  name: string;
  level: string;
  status: string;
}

export interface DeleteQuestionDto {
  id: string;
  storeId: string;
}
