import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import Pagination from '../components/Pagination/Pagination';
import { BrowserRouter } from 'react-router-dom';

describe('Pagination test', () => {
  it('The URL changes when the page changes', async () => {
    render(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    );
    expect(screen.getByText('6'));
    await waitFor(() => {
      userEvent.click(screen.getByText('6'));
      expect(window.location.search).toBe('');
    });
  });
});
