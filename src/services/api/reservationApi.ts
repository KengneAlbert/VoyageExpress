import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

interface ReservationRequest {
  trip_id: string;
  passengers: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    id_number: string;
  }[];
  selected_seats: string[];
  payment_method: 'stripe' | 'om' | 'momo';
}

interface StripeIntent {
  clientSecret: string;
  intentId: string;
}

export const reservationApi = createApi({
  reducerPath: 'reservationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Reservations'],
  endpoints: (builder) => ({
    createReservation: builder.mutation<{ reservation_id: string }, ReservationRequest>({
      query: (data) => ({
        url: 'reservations/',
        method: 'POST',
        body: data,
      }),
    }),

    createPaymentIntent: builder.mutation<StripeIntent, { reservation_id: string }>({
      query: (data) => ({
        url: 'payments/create-intent/',
        method: 'POST',
        body: data,
      }),
    }),

    confirmPayment: builder.mutation<{ status: string }, { reservation_id: string; payment_id: string }>({
      query: (data) => ({
        url: 'payments/confirm/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reservations'],
    }),

    getReservation: builder.query<any, string>({
      query: (id) => `reservations/${id}/`,
      providesTags: ['Reservations'],
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetReservationQuery,
} = reservationApi;
