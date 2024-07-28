import {
  characters,
  character,
} from './../../__test__/__mocks__/charactersMockData';
import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/', () =>
    HttpResponse.json(characters)
  ),
  http.get('https://rickandmortyapi.com/api/character/1', () => {
    delay();
    return HttpResponse.json(character);
  }),
];
