import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type ICard from '../interfaces/ICard';

type Transform = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  data: ICard[];
};

interface GetCharactersQueryParams {
  page: number;
  search?: string;
}

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    fetchAllCharacters: builder.query<Transform, GetCharactersQueryParams>({
      query: ({ page, search }) => {
        return search
          ? `character/?page=${page}&name=${search}`
          : `character/?page=${page}`;
      },
    }),
    getCharacterDetails: builder.query({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useFetchAllCharactersQuery } = characterApi;
