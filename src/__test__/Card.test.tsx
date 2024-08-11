import 'whatwg-fetch';
import Card from '../components/Card/Card';
import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/renderWithProvider';

jest.mock('../components/CloseCard/CloseCard', () => () => <div>Close</div>);

describe('Testing Card Component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  test('Check if displays card data', async () => {
    await renderWithProviders(await Card({ id: '1' }));

    const name = await screen.findByText('Rick Sanchez');
    expect(name).toBeInTheDocument();

    const species = await screen.findByText('Human');
    expect(species).toBeInTheDocument();

    const gender = await screen.findByText('Male');
    expect(gender).toBeInTheDocument();

    const planet = await screen.findByText('Citadel of Ricks');
    expect(planet).toBeInTheDocument();
  });
});
