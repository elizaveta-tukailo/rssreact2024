import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination/Pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { ThemeProvider } from '../context/ThemeContext';
import { createMockRouter } from './__mocks__/routerMockData';

describe('Pagination test', () => {
  it('The URL changes when the page changes', async () => {
    const mockRouter = createMockRouter({ query: { page: '1' } });
    render(
      <ThemeProvider>
        <RouterContext.Provider value={mockRouter}>
          <Pagination totalCount={80} currentPage={1} />
        </RouterContext.Provider>
      </ThemeProvider>
    );
    expect(screen.getByText('4'));
    await waitFor(() => {
      userEvent.click(screen.getByText('4'));
      expect(window.location.search).toBe('');
    });
  });
});
