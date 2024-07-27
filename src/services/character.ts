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
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<Transform, GetCharactersQueryParams>({
      query: ({ page, search }) => {
        let pageParams = page ? `?page=${page}` : '?page=1';
        let searchParams = '';
        if (search) {
          pageParams = '';
          searchParams = `?name=${search.toLocaleLowerCase()}`;
        }
        return search ? searchParams : pageParams;
      },
    }),
    getCharacter: builder.query({
      query: (id: number) => `${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = characterApi;
