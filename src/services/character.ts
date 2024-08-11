import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type ICard from '../interfaces/ICard';
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store/store';
interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

interface Transform {
  info: Info;
  results: ICard[];
}

interface GetCharactersQueryParams {
  page: number;
  search?: string;
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCharacters: builder.query<Transform, GetCharactersQueryParams>({
      query: ({ page, search }) => {
        const params = [];
        if (search) {
          params.push(`name=${encodeURIComponent(search)}`);
        }
        if (page) {
          params.push(`page=${page}`);
        }
        if (params.length > 0) {
          return '?' + params.join('&');
        } else {
          return '';
        }
      },
    }),
    getCharacter: builder.query({
      query: (id: number) => `${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  util: { getRunningQueriesThunk },
} = characterApi;
