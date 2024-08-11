import 'whatwg-fetch';
import Home from '@/src/app/Home';
import Card from '@/src/components/Card/Card';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/renderWithProvider';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      const params = new URLSearchParams('page=1&details=1');
      return params.get(key);
    },
  }),
}));

const searchParams = { page: '1', query: '', details: '' };

describe('Testing Home page', () => {
  test('Check if show characters on the home page', async () => {
    const home = await (async () => Home({ searchParams }))();
    const card = await (async () => Card({ id: '1' }))();

    renderWithProviders(
      <>
        {home}
        {card}
      </>
    );
    const name = await screen.findByText('Morty Smith');
    expect(name).toBeInTheDocument();
    const species = await screen.findByText('Human');
    expect(species).toBeInTheDocument();
  });
});
