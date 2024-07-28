import '@testing-library/jest-dom';
const { expect, describe, it } = require('@jest/globals');
import { MemoryRouter } from 'react-router-dom';
import Card from '../components/Card';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { character } from './__mocks__/charactersMockData';
import { render, screen } from '@testing-library/react';

import * as reduxHooks from 'react-redux';
import { renderWithRouter } from '../testSetup/render-router';

jest.mock('react-redux');

describe('Testing card component', () => {
  it('renders loading state', () => {
    renderWithRouter(<Card />, {
      route: '/details/1',
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('Match snapshot', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(character);

    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/details/1`]}>
          <ThemeProvider>
            <Card />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
  it('Loader should appear while data is fetching', async () => {
    renderWithRouter(<Card />, {
      route: '/details/1',
    });

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
  it('Check if the detailed card component correctly displays the character data;', async () => {
    renderWithRouter(<Card />, {
      route: '/details/1',
    });

    const characterName = await screen.getByText(/Morty/i);
    expect(characterName).toBeInTheDocument();
  });
});
