import { configureStore } from '@reduxjs/toolkit';
import { voyagesApi } from '../services/api/voyagesApi';

export const store = configureStore({
  reducer: {
    [voyagesApi.reducerPath]: voyagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(voyagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
