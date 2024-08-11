import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useTheme } from '@/src/context/ThemeContext';
import CardsList from '../components/CardsList/CardsList';
import {
  setIsClosed,
  setCharacterData,
} from '@/src/store/reducers/characterDetailSlice';
import { toggleCharacter } from '@/src/store/reducers/selectedCharactersSlice';
import * as nextRouter from 'next/router';

interface CharacterDetailState {
  isClosed: boolean;
}

interface SelectedCharactersState {
  selectedCharacters: string[]; // Adjust the type based on what your characters look like
}

interface RootState {
  characterDetail: CharacterDetailState;
  selectedCharacters: SelectedCharactersState;
}
const mockStore = configureStore([]);

jest.mock('../context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = nextRouter.useRouter;

describe('CardsList Component', () => {
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore({
      characterDetail: { isClosed: true },
      selectedCharacters: { selectedCharacters: [] },
    });
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
    (mockUseRouter as jest.Mock).mockReturnValue({
      query: {},
      pathname: '/',
      push: jest.fn(),
    });
  });

  test('renders cards list', () => {
    const cards = [
      {
        id: 1,
        name: 'Character 1',
        image: 'image1.png',
        gender: 'Male',
        species: 'x',
        type: 'x',
      },
      {
        id: 2,
        name: 'Character 2',
        image: 'image2.png',
        gender: 'Female',
        species: 'x',
        type: 'x',
      },
    ];

    render(
      <Provider store={store}>
        <CardsList cards={cards} />
      </Provider>
    );

    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });

  test('handles card click', () => {
    const cards = [
      {
        id: 1,
        name: 'Character 1',
        image: 'image1.png',
        gender: 'Male',
        species: 'x',
        type: 'x',
      },
    ];

    render(
      <Provider store={store}>
        <CardsList cards={cards} />
      </Provider>
    );

    const card = screen.getByText('Character 1');
    fireEvent.click(card);

    expect(mockUseRouter().push).toHaveBeenCalledWith({
      pathname: '/',
      query: { details: '1' },
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual(
      setIsClosed({ isClosed: false, characterId: '1' })
    );
    expect(actions[1]).toEqual(setCharacterData(cards[0]));
  });
});
