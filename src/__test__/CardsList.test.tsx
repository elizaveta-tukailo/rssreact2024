import CardsList from '../components/CardsList/CardsList';
import Theme from '../components/Theme/Theme';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/renderWithProvider';
import { characters } from './__mocks__/charactersMockData';
import { useSearchParams } from 'next/navigation';

jest.mock('../components/CloseCard/CloseCard', () => () => <div>Close</div>);

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      const params = new URLSearchParams('page=1&details=2');
      return params.get(key);
    },
  }),
}));
describe('Test cards list', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Test if correctly render cards', async () => {
    renderWithProviders(
      <Theme>
        <CardsList cards={characters.results} />
      </Theme>
    );

    const characterItems = await screen.findAllByTestId('card');
    expect(characterItems.length).toBe(characters.results.length);
  });
  test('Test if there are no cards', () => {
    renderWithProviders(
      <Theme>
        <CardsList cards={[]} />
      </Theme>
    );

    const emptyMessage = screen.getByText(/No characters/i);
    expect(emptyMessage).toBeInTheDocument();
  });
  test('Test closing detail card by clicking on left side', () => {
    const { getByTestId } = renderWithProviders(
      <Theme>
        <CardsList cards={characters.results} />
      </Theme>
    );

    const peopleItems = getByTestId('people-items');
    fireEvent.click(peopleItems);
    const searchParams = useSearchParams();
    const details = searchParams.get('details');
    expect(details).toBe('2');
  });
});
