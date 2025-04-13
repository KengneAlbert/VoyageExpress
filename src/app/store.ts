import { configureStore } from '@reduxjs/toolkit';
import { voyagesApi } from '../services/api/voyagesApi';
import { authApi } from '../services/api/authApi';
import authReducer from '../services/api/authSlice';
import { reservationApi } from '../services/api/reservationApi';

export const store = configureStore({
  reducer: {
    [voyagesApi.reducerPath]: voyagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(voyagesApi.middleware)
      .concat(authApi.middleware)
      .concat(reservationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
