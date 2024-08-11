import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import SelectedCards from '../components/SelectedCards/SelectedCards';
import { unselectAll } from '../store/reducers/selectedCharactersSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('SelectedCards Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({
        selectedCharacters: {
          selectedCharacters: [
            {
              id: '1',
              name: 'Rick',
              status: 'Alive',
              type: 'Hero',
              gender: 'Male',
            },
            {
              id: '2',
              name: 'Morty',
              status: 'Dead',
              type: 'Villain',
              gender: 'Male',
            },
          ],
        },
      });
    });

    (useTheme as unknown as jest.Mock).mockReturnValue({ theme: 'dark' });
  });

  test('renders selected items count and buttons', () => {
    render(<SelectedCards />);

    expect(screen.getByText(/Quantity of selected items:/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    expect(screen.getByTestId('unselect-btn')).toBeInTheDocument();
    expect(screen.getByTestId('download-btn')).toBeInTheDocument();
  });

  test('dispatches unselectAll when "Unselect all" button is clicked', () => {
    render(<SelectedCards />);

    const unselectButton = screen.getByTestId('unselect-btn');
    fireEvent.click(unselectButton);

    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });

  test('creates a valid download URL', () => {
    render(<SelectedCards />);

    const downloadButton = screen.getByTestId('download-btn');

    expect(downloadButton).toHaveAttribute('href');
    const expectedFileName = '2_characters';
    expect(downloadButton).toHaveAttribute('download', expectedFileName);
  });

  test('applies correct styles based on theme', () => {
    (useTheme as unknown as jest.Mock).mockReturnValue({ theme: 'light' });
    const { container } = render(<SelectedCards />);

    expect(container.firstChild).toHaveClass('selectedItems');
    expect(container.firstChild).toHaveClass('selectedItemsLight');
  });

  test('provides correct CSV download link', () => {
    render(<SelectedCards />);

    const downloadLink = screen.getByTestId('download-btn');
    expect(downloadLink).toHaveAttribute('download', '2_characters');
  });
});
