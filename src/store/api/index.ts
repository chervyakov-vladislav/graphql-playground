import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface PayloadParams {
  query: string;
  variables?: string;
}

export interface ICustomError {
  data: {
    errors: Array<{ message: string }>;
  };
  status: number;
}

const baseUrl = 'https://api.escuelajs.co/graphql';

export const graphQl = createApi({
  reducerPath: 'getData',
  tagTypes: ['Data'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, object>,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getData: build.mutation({
      query: (body: PayloadParams) => ({
        url: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Data', id: 'LIST' }],
    }),
  }),
});

export const { useGetDataMutation } = graphQl;

export const { getData } = graphQl.endpoints;
