import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type * as API from "@my-app/services";
import { authApi, meApi, PermissionDtoPermissionNameEnum, ProfiledDto } from "@my-app/services";
import { RootState } from "./root";

export const SESSION_FEATURE_KEY = "session";

export interface SessionState {
  loaded: boolean;
  token?: string;
  error?: string;
  profile?: ProfiledDto;
  permissions?: {
    [key in PermissionDtoPermissionNameEnum]?: boolean;
  };

  loginStatus?: "loading" | "loaded" | "error";
  loginErrorMsg?: string;
}

export const checkLoginStatus = createAsyncThunk("session/checkLoginStatus", async (): Promise<string> => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject();
  }
  await authApi.authControllerCheckLoginStatus({ headers: { jwt: token } });
  return token;
});

export const login = createAsyncThunk("session/login", async (params: API.UserLoginDto): Promise<any> => {
  return authApi.authControllerUserLogin(params);
});

export const getProfile = createAsyncThunk("session/profile", async (): Promise<any> => {
  return meApi.meControllerGetProfile();
});

const getPermissons = createAsyncThunk("session/getPermissons", async (): Promise<any> => {
  return meApi.meControllerGetPermissions();
});

export const initialSessionState: SessionState = {
  loaded: false,
  permissions: {},
};

export const sessionSlice = createSlice({
  name: SESSION_FEATURE_KEY,
  initialState: initialSessionState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      delete state.token;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check login with token
      .addCase(checkLoginStatus.fulfilled, (state: SessionState, { payload }) => {
        state.loaded = true;
        state.token = payload;
      })
      .addCase(checkLoginStatus.rejected, (state: SessionState, action) => {
        state.loaded = true;
      })
      // Login
      .addCase(login.pending, (state: SessionState, action) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state: SessionState, action) => {
        state.loginStatus = "loaded";
        state.token = action.payload.accessToken as string;
        localStorage.setItem("token", state.token);
      })
      .addCase(login.rejected, (state: SessionState, { error }) => {
        state.loginStatus = "error";
        state.loginErrorMsg = error?.message;
      })
      .addCase(getProfile.fulfilled, (state: SessionState, action) => {
        state.profile = action.payload;
      })
      .addCase(getPermissons.fulfilled, (state: SessionState, action) => {
        const permissions: any = {};
        const arrPermissions: string[] = action.payload.permissions || [];
        arrPermissions.map((value: string) => {
          permissions[value] = true;
        });
        state.permissions = permissions;
      });
  },
});

export const sessionReducer = sessionSlice.reducer;

export const sessionActions = {
  getProfile,
  getPermissons,
  ...sessionSlice.actions,
};

export const getSessionState = (rootState: RootState): SessionState => rootState[SESSION_FEATURE_KEY];

export const selectToken = createSelector(getSessionState, (data) => {
  return data.token;
});

export const getTokenError = createSelector(getSessionState, (data) => {
  return data.token;
});

export const getLoginStatus = createSelector(getSessionState, (data) => {
  return data.loginStatus;
});

export const getloginErrorMsg = createSelector(getSessionState, (data) => {
  return data.loginErrorMsg;
});

const profile = createSelector(getSessionState, (data) => {
  return data.profile;
});

const _getPermissons = createSelector(getSessionState, (data) => {
  return data.permissions;
});

export const sessionsSelectors = {
  getPermissons: _getPermissons,
  profile,
};
