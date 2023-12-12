export interface ContactDto {
  lastName: string;
  firstName: string;
  email: string;
  reasons: string;
  description: string;
  phoneNumber: string;
}

export interface CreateContactDto {
  lastName: string;
  firstName: string;
  email: string;
  reasons: string;
  description: string;
  phoneNumber: string;
}

export interface UpdateContactDto {
  id?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  reasons?: string;
  description?: string;
  phoneNumber?: string;
  isRead?: boolean;
}
