import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from '../components/Card/Card';
import { useGetCharacterQuery } from '../services/character';
import {
  setCharacterData,
  setIsClosed,
} from '../store/reducers/characterDetailSlice';
import { useRouter } from 'next/router';
import { character, characters } from './__mocks__/charactersMockData';

jest.mock('../services/character');
jest.mock('../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const mockStore = configureStore([]);

describe('Card Component', () => {
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore({
      characterDetail: {},
      pageCharacters: characters,
    });

    jest.clearAllMocks();
  });

  test('renders character data correctly', () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { details: '1' } });
    const characterData = character;
    (useGetCharacterQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: characterData,
      error: null,
    });

    render(
      <Provider store={store}>
        <Card />
      </Provider>
    );

    expect(screen.getByText('Card ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('dispatches close modal action on button click', () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { details: '1' } });
    const characterData = character;
    (useGetCharacterQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: characterData,
      error: null,
    });

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Card />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(dispatchSpy).toHaveBeenCalledWith(
      setIsClosed({ isClosed: true, characterId: 0 })
    );
    expect(dispatchSpy).toHaveBeenCalledWith(setCharacterData([]));
  });

  test('renders error message when error occurs', () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { details: '1' } });
    (useGetCharacterQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: null,
      error: true,
    });

    render(
      <Provider store={store}>
        <Card />
      </Provider>
    );

    expect(screen.getByText('No data found!')).toBeInTheDocument();
  });
});
