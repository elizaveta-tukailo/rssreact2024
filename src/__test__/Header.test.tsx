import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import Header from '../components/Header/Header';
import styles from './header.module.css';
import Search from '../components/Search/Search';

jest.mock('../context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

describe('Header Component', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });
  });

  test('renders Header component', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('Check if renders with light theme', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass(styles['headerLight']);
  });

  test('Check if toggles theme works properly', () => {
    const toggleThemeMock = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<Header />);

    const themeButton = screen.getByTestId('theme-btn');
    fireEvent.click(themeButton);

    expect(toggleThemeMock).toHaveBeenCalled();
  });

  test('Check if header renders with dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(styles['header']);
    expect(header).toHaveClass(styles['headerDark']);
  });
});
