import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type ICard from '../interfaces/ICard';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacterByName: builder.query<ICard, string>({
      query: (name) => `character/${name}`,
    }),
  }),
});
