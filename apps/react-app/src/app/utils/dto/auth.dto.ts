import { UserRole } from "../enum/user";

export interface ReqLoginDto {
  email: string;
  password: string;
}
export interface ReqRegisterDto {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPw: string;
}

export interface ReqForgotPassDto {
  email: string;
}
export interface CheckOtpDto {
  email: string;
  otp: string;
}
export interface ActiveAccount {
  token: string;
}
export interface ReqResetPasswordDto {
  password: string;
  confirmPw: string;
}

export interface ReqChangePasswordDto {
  oldPassword: string;
  password: string;
}

export interface ReqProfileDto {
  fullName: "string";
  email: "string";
  avatar: "string";
  phoneNumber: "string";
  dob: "string";
  storeId: "string";
  userCode: "string";
  province: "string";
  district: "string";
  address: "string";
}

export interface ResLoginDto {
  isSuccess: boolean;
  status: number;
  message: string;
  data: {
    token: string;
    userJwtDto: {
      id: string;
      email: string;
      role: string;
      permisions: string[];
    };
  };
}
export interface LoginDto {
  token: string;
  avatar: string;
  id: string;
  email: string;
  fullName: string;
  role: any;
}

export interface MeDto {
  id: string;
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
  role: UserRole;
  isActive: boolean;
}

export interface StoreDto {
  avatar: string;
  email: string;
  name: string;
  position: string;
  url: string;
  _id: string;
}
