// import '@testing-library/jest-dom';
// import { fireEvent, render, screen } from '@testing-library/react';
// import Search from '../components/Search';
// import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from '../context/ThemeContext';
// import renderer from 'react-test-renderer';
// import { Provider } from 'react-redux';
// import { store } from '../store/store';

// const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
// const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');

// describe('Search', () => {
//   it('Show input', () => {
//     render(
//       <BrowserRouter>
//         <ThemeProvider>
//           <Search />
//         </ThemeProvider>
//       </BrowserRouter>
//     );
//     const input = screen.getByPlaceholderText('Type here');
//     expect(input).toBeInTheDocument();
//   });
//   it('Search component renders correctly', () => {
//     const tree = renderer
//       .create(
//         <BrowserRouter>
//           <Provider store={store}>
//             <ThemeProvider>
//               <Search />
//             </ThemeProvider>
//           </Provider>
//         </BrowserRouter>
//       )
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('Testing Search component', () => {
//   beforeEach(() => {
//     mockSetItem.mockClear();
//     mockGetItem.mockClear();
//   });

//   afterAll(() => {
//     mockSetItem.mockRestore();
//     mockGetItem.mockRestore();
//   });
//   test('Clicking the Search button saves the entered value to the local storage', () => {
//     render(
//       <BrowserRouter>
//         <ThemeProvider>
//           <Search />
//         </ThemeProvider>
//       </BrowserRouter>
//     );
//     const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
//     fireEvent.change(input, { target: { value: 'test value' } });
//     const button = screen.getByRole('button', { name: /search/i });
//     fireEvent.click(button);
//     expect(mockSetItem).toHaveBeenCalledWith('searchQuery', 'test value');
//   });

//   test('Check that the component retrieves the value from the local storage upon mounting', () => {
//     mockGetItem.mockImplementation(() => 'stored value');
//     render(
//       <BrowserRouter>
//         <ThemeProvider>
//           <Search />
//         </ThemeProvider>
//       </BrowserRouter>
//     );
//     const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
//     expect(input.value).toBe('stored value');
//   });
// });
// test('проверка на true', () => {
//   expect(true).toBe(true);
// });

import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { setupStore } from '../store/store';
import MainPage from '../pages/index';
import { createMockRouter } from './__mocks__/routerMockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';

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

describe('MainPage Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should save the search term to local storage on submit', async () => {
    const mockRouter = createMockRouter({ query: { page: '1' } });
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterContext.Provider value={mockRouter}>
            <MainPage />
          </RouterContext.Provider>
        </ThemeProvider>
      </Provider>
    );

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

  it('should retrieve the search term from local storage upon mounting', async () => {
    localStorage.setItem('searchQuery', 'Rick');
    const mockRouter = createMockRouter({ query: { page: '1' } });
    const store = setupStore();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterContext.Provider value={mockRouter}>
            <MainPage />
          </RouterContext.Provider>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Type here/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Type here/i) as HTMLInputElement;

    await waitFor(() => expect(input.value).toBe('Rick'));
  });
});
