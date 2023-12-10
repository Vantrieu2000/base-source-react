import { combineReducers } from '@reduxjs/toolkit';
import { ordersSlice } from '../orders.slice';
import { permissionsSlice } from '../permissions.slice';
import { sessionSlice } from '../session.slice';;
import { uiSlice } from '../ui.slice';

export const rootReducer = combineReducers({
  session: sessionSlice.reducer,
  permissions: permissionsSlice.reducer,
  ui: uiSlice.reducer,
  orders: ordersSlice.reducer,
});
