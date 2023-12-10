import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authMiddleware } from '../middleware';
import { initialRootState, RootState } from './root-state.initial';
import { rootReducer } from './root.reducer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const rootStore = configureStore({
  reducer: (state, action) => {
    return rootReducer(
      action.type === 'session/logout' ? { session: { loaded: true } } : state,
      action
    );
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  devTools: isDevelopment,
  preloadedState: initialRootState,
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { rootStore };
