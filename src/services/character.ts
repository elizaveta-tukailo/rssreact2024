import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type ICard from '../interfaces/ICard';

type Transform = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: ICard[];
};

interface GetCharactersQueryParams {
  page: number;
  search?: string;
}

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<Transform, GetCharactersQueryParams>({
      query: ({ page, search }) => {
        return search
          ? `character/?page=${page}&name=${search}`
          : `character/?page=${page}`;
      },
    }),
    getCharacter: builder.query({
      query: (id: number) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = characterApi;
