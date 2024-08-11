import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CloseCard from '../components/CloseCard/CloseCard';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Testing CloseCard component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSearchParams = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseSearchParams.mockReturnValue(new URLSearchParams('?details=test'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Call router.push with updated search params when button is clicked', () => {
    render(<CloseCard />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('?');
  });

  test('Check if renders a button', () => {
    render(<CloseCard />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
