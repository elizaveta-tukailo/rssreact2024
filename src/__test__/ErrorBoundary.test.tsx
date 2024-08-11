import { render, screen, fireEvent, act } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ErrorButton from '../components/ErrorBoundary/Button';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../context/ThemeContext';

describe('Testing ErrorBoundary Component', () => {
  test('Check if page renders children without error', () => {
    render(
      <ErrorBoundary>
        <ThemeProvider>
          <div>Child Component</div>
        </ThemeProvider>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('Should catches error and displays error message', () => {
    render(
      <ErrorBoundary>
        <ThemeProvider>
          <ErrorButton />
        </ThemeProvider>
      </ErrorBoundary>
    );

    const button = screen.getByText('Error Button');

    act(() => {
      try {
        fireEvent.click(button);
      } catch (error) {}
    });

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
