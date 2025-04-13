import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from './authSlice';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  password: string;
  password_confirm: string;
  verification_method: string;
}

interface AuthResponse {
  key: string;
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
  };
}

interface VerifyOtpRequest {
  user_id: string;
  otp: string;
}

interface ResendOtpRequest {
  user_id: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/auth/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
    //   if (token) {
    //     headers.set('authorization', `Token ${token}`);
    //   }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error: any) {
          if (error?.error?.status === 401) {
            dispatch(logout());
          }
        }
      },
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: 'register/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyToken: builder.query({
      query: () => 'verify/',
    }),
    verifyOtp: builder.mutation<{ detail: string }, VerifyOtpRequest>({
      query: (credentials) => ({
        url: 'register/verify-otp/',
        method: 'POST',
        body: credentials,
      }),
    }),
    resendOtp: builder.mutation<{ detail: string }, ResendOtpRequest>({
      query: (data) => ({
        url: 'register/resend-otp/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<{ detail: string }, { key: string }>({
      query: (data) => ({
        url: 'register/verify-email/',  // Updated to match Django URL pattern
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useVerifyEmailMutation,
} = authApi;
