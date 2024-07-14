import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPageCardList from '../pages/main-page/MainPageCardList';

describe('CardList testing', () => {
  const state = {
    cards: [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      },
    ],
  };
  it('Render card list', async () => {
    render(
      <BrowserRouter>
        <MainPageCardList cards={state.cards} />;
      </BrowserRouter>
    );
    expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/)).toBeInTheDocument();
  });
  it('Nothing found test', () => {
    render(
      <BrowserRouter>
        <MainPageCardList cards={[]} />;
      </BrowserRouter>
    );
    expect(screen.getByText(/Nothing found/)).toBeInTheDocument();
  });
});
