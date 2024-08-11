import { render, screen } from '@testing-library/react';
import { ThemeContext, useTheme, ThemeProvider } from '../context/ThemeContext';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('Testing ThemeContext', () => {
  test('Test a default theme', () => {
    const mockToggleTheme = jest.fn();
    const mockContextValue: ThemeContextProps = {
      theme: 'light',
      toggleTheme: mockToggleTheme,
    };

    render(
      <ThemeContext.Provider value={mockContextValue}>
        <TestComponent />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');

    screen.getByText('Toggle Theme').click();

    expect(mockToggleTheme).toHaveBeenCalled();
  });
  test('Should not throw error if useTheme is used within ThemeProvider', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    }).not.toThrow();
  });

  test('Should throws an error when used outside of ThemeProvider', () => {
    const renderWithoutProvider = () => render(<TestComponent />);
    expect(renderWithoutProvider).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
  });
});
