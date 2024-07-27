import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination/Pagination';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Pagination test', () => {
  it('The URL changes when the page changes', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Pagination totalCount={80} currentPage={1} />
        </ThemeProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('4'));
    await waitFor(() => {
      userEvent.click(screen.getByText('4'));
      expect(window.location.search).toBe('');
    });
  });
  it('Pagination component renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <ThemeProvider>
              <Pagination totalCount={80} currentPage={1} />
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
