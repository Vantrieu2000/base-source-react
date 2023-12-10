/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState } from "@reduxjs/toolkit";
import type * as API from "@my-app/services";
import { permissionApi } from "@my-app/services";

export const PERMISSIONS_FEATURE_KEY = "permissions";

/*
 * Update these interfaces according to your requirements.
 */
export interface PermissionsEntity extends API.PermissionDto {
  id: number;
}

export interface PermissionsState extends EntityState<PermissionsEntity> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: string | undefined | null;
}

export const permissionsAdapter = createEntityAdapter<PermissionsEntity>();

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchStatus",
  async ({ page, limit }: any, { rejectWithValue }) => {
    return permissionApi.permissionControllerFind(page, limit).catch((e) => rejectWithValue(e));
  }
);

export const initialPermissionsState: PermissionsState = permissionsAdapter.getInitialState({
  loadingStatus: "not loaded",
  error: null,
});

export const permissionsSlice = createSlice({
  name: PERMISSIONS_FEATURE_KEY,
  initialState: initialPermissionsState,
  reducers: {
    add: permissionsAdapter.addOne,
    remove: permissionsAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.fulfilled, (state: PermissionsState, action: any) => {
        permissionsAdapter.setAll(state, action.payload.data);
        state.loadingStatus = "loaded";
      })
      .addCase(fetchPermissions.rejected, (state: PermissionsState, action) => {
        state.loadingStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const permissionsReducer = permissionsSlice.reducer;

export const permissionsActions = {
  fetchPermissions,
  ...permissionsSlice.actions,
};

const { selectAll, selectEntities } = permissionsAdapter.getSelectors();

export const getPermissionsState = (rootState: any): PermissionsState => rootState[PERMISSIONS_FEATURE_KEY];

export const selectAllPermissions = createSelector(getPermissionsState, selectAll);

export const selectPermissionsEntities = createSelector(getPermissionsState, selectEntities);

export const permissionsSelectors = {
  selectAllPermissions,
  selectPermissionsEntities,
};
