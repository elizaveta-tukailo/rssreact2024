import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../components/Loader/Loader';
import styles from './loader.module.css';

describe('Loader Component', () => {
  it('Check if renders correctly without crashing', () => {
    render(<Loader />);
  });

  it('Check if renders an SVG element', () => {
    const { container } = render(<Loader />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
