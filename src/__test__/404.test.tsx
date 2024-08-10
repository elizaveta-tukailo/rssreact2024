import { render, screen } from '@testing-library/react';
import NotFound from '../pages/404';
import '@testing-library/jest-dom';

describe('Test 404 page', () => {
  it('Show the 404 error text', () => {
    render(<NotFound />);
    expect(screen.getByText('404 Error! Page not found')).toBeInTheDocument();
  });
});
