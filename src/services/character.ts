import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type ICard from '../interfaces/ICard';

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

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
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

export const { useGetCharactersQuery, useGetCharacterQuery } = characterApi;
