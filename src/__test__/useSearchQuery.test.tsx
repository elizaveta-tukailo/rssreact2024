import React, { ChangeEvent } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useSearchQuery from '../hooks/useSearchQuery';

const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
});

afterEach(() => {
  window.localStorage.clear();
});

interface TestComponentProps {
  searchKey: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ searchKey }) => {
  const [query, setQuery] = useSearchQuery(searchKey);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    window.localStorage.setItem('searchQuery', query);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <input value={query} onChange={handleChange} data-testid="search-input" />
      <button type="submit" data-testid="search-button">
        Search
      </button>
      <span data-testid="query-display">{query}</span>
    </form>
  );
};
describe('Test hook useSearchQuery', () => {
  test('should initialize query from localStorage', () => {
    window.localStorage.setItem('searchQuery', 'initialQuery');

    const { getByTestId } = render(<TestComponent searchKey="searchQuery" />);

    const input = getByTestId('search-input') as HTMLInputElement;
    const display = getByTestId('query-display');

    expect(input.value).toBe('initialQuery');
    expect(display.textContent).toBe('initialQuery');
  });

  test('should update query and save to localStorage', () => {
    const { getByTestId } = render(<TestComponent searchKey="searchQuery" />);

    const input = getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(input.value).toBe('New value');

    const button = getByTestId('search-button');
    fireEvent.click(button);

    expect(window.localStorage.getItem('searchQuery')).toBe('New value');
  });
});
