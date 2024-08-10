import { renderHook, waitFor } from '@testing-library/react';
import {
  useGetCharactersQuery,
  useGetCharacterQuery,
} from '../services/character';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { setupStore } from '../store/store';
import fetchMock from 'jest-fetch-mock';
import { character, characters } from './__mocks__/charactersMockData';
import 'whatwg-fetch';

const store = setupStore();
fetchMock.enableMocks();

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('Check character API', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Check useGetCharactersQuery', async () => {
    fetchMock.mockOnceIf(`https://rickandmortyapi.com/api/character/`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(characters),
      })
    );

    const { result } = renderHook(() => useGetCharactersQuery({ page: 1 }), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getCharacters',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock.mock.calls.length).toBe(1);

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName: 'getCharacters',
      data: characters,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: {},
      isFetching: false,
    });
  });

  test('Check useGetCharacterQuery', async () => {
    fetchMock.mockOnceIf(`https://rickandmortyapi.com/api/character/1`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(character),
      })
    );

    const { result } = renderHook(() => useGetCharacterQuery(1), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getCharacter',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock.mock.calls.length).toBe(1);

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName: 'getCharacter',
      data: character,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: character,
      isFetching: false,
    });
  });
});
