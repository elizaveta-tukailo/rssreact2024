import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../components/Loader/Loader';

describe('Testing Loader Component', () => {
  test('Check if renders correctly without crashing', () => {
    render(<Loader />);
  });

  test('Check if renders an SVG element', () => {
    const { container } = render(<Loader />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
