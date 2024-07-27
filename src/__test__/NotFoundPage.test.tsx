import NotFoundPage from '../pages/not-found-page/NotFoundPage';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('MainLayout', () => {
  it('renders all required components', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
