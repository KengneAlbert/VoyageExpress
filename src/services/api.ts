import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { City, Trip, SearchParams } from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/v1/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCities: builder.query<City[], string>({
      query: (search) => `cities/?search=${search}`,
    }),
    
    searchTrips: builder.query<Trip[], SearchParams>({
      query: (params) => ({
        url: 'trips/search/',
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: Trip[]) => {
        return response.map(trip => ({
          ...trip,
          price: {
            amount: Number(trip.price.amount),
            currency: trip.price.currency
          }
        }));
      },
    }),
  }),
});

export const { useGetCitiesQuery, useSearchTripsQuery } = api;
