import { HYDRATE } from 'next-redux-wrapper';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { selectDocument } from '../reducers/document/slice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '',
});

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const { link } = selectDocument(api.getState() as RootState);
  if (!link) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'Not valid url',
      },
    };
  }

  const adjustedUrl = link;
  const adjustedArgs = typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };
  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

interface PayloadParams {
  body: {
    query: string;
    variables?: string;
  };
  headers?: Record<string, string>;
}

export interface ICustomError {
  data: {
    errors: Array<{ message: string }>;
  };
  status: number;
}

export const graphQl = createApi({
  reducerPath: 'getData',
  tagTypes: ['Data'],
  baseQuery: dynamicBaseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getData: build.mutation({
      query: ({
        body,
        headers = {
          'Content-Type': 'application/json',
        },
      }: PayloadParams) => ({
        url: '/',
        method: 'POST',
        headers,
        body,
      }),
      invalidatesTags: [{ type: 'Data', id: 'LIST' }],
    }),
  }),
});

export const { useGetDataMutation } = graphQl;

export const { getData } = graphQl.endpoints;
