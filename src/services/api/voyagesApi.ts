import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchParams, TripSearchResponse, Agency, Route, CityReponse, TripReponse } from './types';

export const voyagesApi = createApi({
  reducerPath: 'voyagesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // Add CSRF token to headers
      // const token = getCSRFToken();
      // if (token) {
      //   headers.set('X-CSRFToken', token);
      // }
      
      // // Add auth token if exists
      // const authToken = (getState() as RootState).auth.token;
      // if (authToken) {
      //   headers.set('authorization', `Token ${authToken}`);
      // }
      return headers;
    },
  }),
  tagTypes: ['Trips', 'Cities', 'Agencies', 'Routes'],
  endpoints: (builder) => ({
    searchTrips: builder.query<TripReponse, SearchParams>({
      query: (params) => ({
        url: 'trips/',
        params: {
          // route__departure__city__name: params.departure,
          // route__arrived__city__name: params.destination,
          // start_date: params.date,
          // number_of_passengers: params.passengers,
        },
      }),
      providesTags: ['Trips'],
    }),
    
    getPopularRoutes: builder.query<Route[], void>({
      query: () => 'trips/popular',
      providesTags: ['Routes'],
    }),

    getCities: builder.query<CityReponse, void>({
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
