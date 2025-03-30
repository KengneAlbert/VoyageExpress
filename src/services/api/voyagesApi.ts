import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchParams, TripSearchResponse } from './types';

export const voyagesApi = createApi({
  reducerPath: 'voyagesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/',
    // Add any default headers or auth logic here
  }),
  endpoints: (builder) => ({
    searchTrips: builder.query<TripSearchResponse[], SearchParams>({
      query: (params) => ({
        url: 'trips/search',
        method: 'GET',
        params: {
          departure_city: params.departure,
          destination_city: params.destination,
          travel_date: params.date,
          passengers: params.passengers,
        },
      }),
    }),
    
    getPopularRoutes: builder.query<TripSearchResponse[], void>({
      query: () => 'trips/popular',
    }),

    getCities: builder.query<string[], void>({
      query: () => 'cities',
    }),
  }),
});

export const {
  useSearchTripsQuery,
  useLazySearchTripsQuery,
  useGetPopularRoutesQuery,
  useGetCitiesQuery,
} = voyagesApi;
