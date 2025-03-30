import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchParams, TripSearchResponse, Agency, City, Route } from './types';

export const voyagesApi = createApi({
  reducerPath: 'voyagesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include',
  }),
  tagTypes: ['Trips', 'Cities', 'Agencies', 'Routes'],
  endpoints: (builder) => ({
    searchTrips: builder.query<TripSearchResponse[], SearchParams>({
      query: (params) => ({
        url: 'trips/search',
        params: {
          departure_city: params.departure,
          destination_city: params.destination,
          travel_date: params.date,
          passengers: params.passengers,
        },
      }),
      providesTags: ['Trips'],
    }),
    
    getPopularRoutes: builder.query<Route[], void>({
      query: () => 'trips/popular',
      providesTags: ['Routes'],
    }),

    getCities: builder.query<City[], void>({
      query: () => 'cities/',
      providesTags: ['Cities'],
    }),

    getAgencies: builder.query<Agency[], void>({
      query: () => 'agencies/',
      providesTags: ['Agencies'],
    }),

    getRoutesByCity: builder.query<Route[], string>({
      query: (cityId) => `routes/?city=${cityId}`,
      providesTags: ['Routes'],
    }),

    getTripById: builder.query<TripSearchResponse, string>({
      query: (id) => `trips/${id}/`,
      providesTags: (_result, _err, id) => [{ type: 'Trips', id }],
    }),
  }),
});

export const {
  useSearchTripsQuery,
  useLazySearchTripsQuery,
  useGetPopularRoutesQuery,
  useGetCitiesQuery,
  useGetAgenciesQuery,
  useGetRoutesByCityQuery,
  useGetTripByIdQuery,
} = voyagesApi;
