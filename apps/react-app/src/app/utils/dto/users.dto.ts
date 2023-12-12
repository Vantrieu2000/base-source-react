import { ProfileArea, ProfileType } from '../enum/profile';
import {
  SocialType,
  UserGender,
  UserRole,
  UserStatus,
  UserType,
} from '../enum/user';

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  rejectText?: string;
  lastLogin?: Date;
  role: UserRole;
  status: UserStatus;
}

export interface RoleDto {
  id : string;
  name : string;
}

export interface InterestDto {
  id: string;
  name: string;
  area: ProfileArea;
  type: ProfileType;
}
export interface PurposeDto {
  id: string;
  name: string;
  area: ProfileArea;
  type: ProfileType;
}
export interface SocialDto {
  id: string;
  url: string;
  type: SocialType;
}

export interface ProfessionDto {
  id: string;
  name: string;
}

export interface ProfileDto {
  id: string;
  city: string;
  district: string;
  profession: ProfessionDto;
  age: number;
  bio: string;
  interests: InterestDto[];
  purposes: PurposeDto[];
  type: UserType;
  gender: UserGender;
}

export interface OccupationDto {
  id: string;
  name: string;
  area: ProfileArea;
}
export interface IndustryDto {
  id: string;
  name: string;
  area: ProfileArea;
}

export interface WorkHistoryDto {
  name: string;
  position: string;
  occupation: OccupationDto;
  industry: IndustryDto;
}

export interface AdminDto {
  id: string;
  fullName: string;
  dob : string;
  avatar: string;
  status : string;
  email: string;
  roleId: string;
  storeId: string;
  role : RoleDto[]
}

export interface SearchUserDto {
  page?: number;
  limit?: number;
  isAll?: boolean;
  keyword?: string;
  status?: UserStatus;
}

export interface ReqAcceptDto {
  id: string;
}
export interface ReqRejectDto {
  id: string;
  rejectText?: string;
}

export interface ResFetchUser {
  data: UserDto[];
  length: number;
}

export interface UpdateUserDto {
  id : string;
  fullName : string;
  email : string;
}

export interface CreateAdminDto {
  fullName : string;
  email : string;
  password : string;
}

export interface CustomerDto {
  
}

export interface CreateCustomerDto {

}
