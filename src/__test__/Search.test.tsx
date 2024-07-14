import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../components/Search';
import { BrowserRouter } from 'react-router-dom';

const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');

describe('Search', () => {
  it('Show input', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Type here');
    expect(input).toBeInTheDocument();
  });
});

describe('Testing Search component', () => {
  afterEach(() => {
    mockSetItem.mockClear();
    mockGetItem.mockClear();
  });
  test('Clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test value' } });
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(mockSetItem).toHaveBeenCalledWith('searchQuery', 'test value');
  });

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    mockGetItem.mockImplementation(() => 'stored value');
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
    expect(input.value).toBe('stored value');
  });
});
