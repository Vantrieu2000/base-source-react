import { customAxios } from ".";
import {
  ActiveAccount,
  CheckOtpDto,
  MeDto,
  ReqChangePasswordDto,
  ReqForgotPassDto,
  ReqLoginDto,
  ReqProfileDto,
  ReqRegisterDto,
  ReqResetPasswordDto,
  ResLoginDto,
} from "../dto/auth.dto";

export const Auth = {
  login,
  me,
  forgotPassword,
  checkToken,
  resetPassword,
  checkOTP,
  changePassword,
  updateProfile,
  activeAccount,
  register,
  checkResetPassWordToken,
};

/////// POST

async function login(payload: ReqLoginDto): Promise<ResLoginDto> {
  const response = await customAxios.post("auth/signIn", {
    ...payload,
  });
  return response.data;
}
async function register(payload: ReqRegisterDto): Promise<ResLoginDto> {
  const response = await customAxios.post("auth/signUp", {
    ...payload,
  });
  return response.data;
}
async function forgotPassword(payload: ReqForgotPassDto): Promise<any> {
  const response = await customAxios.post("auth/forgotPw", {
    ...payload,
  });
  return response.data;
}
async function resetPassword(payload: ReqResetPasswordDto): Promise<any> {
  const response = await customAxios.post("auth/newPassword", {
    ...payload,
  });
  return response.data;
}

async function checkOTP(payload: CheckOtpDto): Promise<any> {
  const response = await customAxios.post("auth/verify-token-reset-password", {
    ...payload,
  });
  return response.data;
}

async function changePassword(payload: ReqChangePasswordDto): Promise<any> {
  const response = await customAxios.post("auth/change-password", {
    ...payload,
  });
  return response.data;
}

async function updateProfile(payload: ReqProfileDto): Promise<any> {
  const response = await customAxios.put("auth/profile", {
    ...payload,
  });
  return response.data;
}

/////// GET

async function me(): Promise<MeDto> {
  const response = await customAxios.get("auth");
  return response.data.data;
}
async function checkToken(payload: string): Promise<any> {
  const response = await customAxios.get("admin/checkExpire", {
    params: {
      token: payload,
    },
  });
  return response.data;
}

async function activeAccount(payload: ActiveAccount): Promise<any> {
  const response = await customAxios.get(`auth/active/${payload.token}`);
  return response.data;
}

async function checkResetPassWordToken(payload: ActiveAccount): Promise<any> {
  const response = await customAxios.get(`auth/forgotPw/${payload.token}`);
  return response.data;
}
