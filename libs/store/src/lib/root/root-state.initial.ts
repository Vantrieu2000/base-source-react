
import { initialOrdersState, OrdersState } from '../orders.slice';
import { initialSessionState, SessionState } from '../session.slice';
import { initialUiState, UiState } from '../ui.slice';

export interface RootState {
  session: SessionState;
  orders: OrdersState;
  ui: UiState;
}

export const initialRootState: RootState = {
  session: initialSessionState,
  orders: initialOrdersState,
  ui: initialUiState,
};
