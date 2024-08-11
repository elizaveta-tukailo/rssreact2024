import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination/Pagination';
import { renderWithProviders } from '../utils/renderWithProvider';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      const params = new URLSearchParams('page=1& search=rick&details=4');
      return params.get(key);
    },
  }),
}));

describe('Pagination test', () => {
  test('The URL changes when the page changes', async () => {
    renderWithProviders(<Pagination currentPage={1} totalCount={80} />);
    expect(screen.getByText('4'));
    await waitFor(() => {
      userEvent.click(screen.getByText('4'));
      expect(window.location.search).toBe('');
      expect(pushMock).toHaveBeenCalledWith(expect.stringContaining('page=4'));
    });
  });
});
