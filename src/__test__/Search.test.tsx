import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../utils/renderWithProvider';
import Search from '../components/Search/Search';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      const params = new URLSearchParams('details=1');
      return params.get(key);
    },
  }),
}));
jest.mock('../hooks/useSearchQuery', () => {
  return jest.fn((key: string, defaultValue: string = '') => {
    const [value, setValue] = React.useState(
      () => localStorage.getItem(key) || defaultValue
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue] as const;
  });
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Testing Search Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('Should save the search value to localStorage after submitting', async () => {
    renderWithProviders(<Search />);

    expect(screen.getByPlaceholderText(/Type here/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Type here/i), {
      target: { value: 'Rick' },
    });

    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() =>
      expect(localStorage.getItem('searchQuery')).toBe('Rick')
    );
  });

  test('Should retrieve the search value from local storage', async () => {
    localStorage.setItem('searchQuery', 'Rick');
    renderWithProviders(<Search />);

    expect(screen.getByPlaceholderText(/Type here/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Type here/i) as HTMLInputElement;

    await waitFor(() => expect(input.value).toBe('Rick'));
  });
});
