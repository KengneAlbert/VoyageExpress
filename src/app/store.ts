import { configureStore } from '@reduxjs/toolkit';
import { voyagesApi } from '../services/api/voyagesApi';
import { authApi } from '../services/api/authApi';
import authReducer from '../services/api/authSlice';

export const store = configureStore({
  reducer: {
    [voyagesApi.reducerPath]: voyagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(voyagesApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
