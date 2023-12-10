/* eslint-disable @typescript-eslint/ban-types */
import { Middleware } from 'redux';
import { sessionActions } from '../session.slice';

export const authMiddleware: Middleware<{}> = (store) => (next) => (action) => {
  try {
    if (action.error && action?.payload?.status_code === 401) {
      setTimeout(() => {
        store.dispatch(sessionActions.logout());
      }, 0);
    }
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);

    throw err;
  }
};
