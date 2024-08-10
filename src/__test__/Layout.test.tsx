import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout/Layout';
import '@testing-library/jest-dom';

jest.mock('../components/Header/Header', () => () => <div>Mock Header</div>);

const renderWithTheme = (children: React.ReactNode, theme: string) => {
  return render(
    <ThemeProvider>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
};

describe('Layout component', () => {
  it('renders children correctly in light theme', () => {
    const { getByText, container } = renderWithTheme(
      <div>Child Component</div>,
      'light'
    );

    expect(getByText('Child Component')).toBeInTheDocument();

    expect(getByText('Mock Header')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass('pageWrap');
    expect(container.firstChild).toHaveClass('pageWrapLight');
  });
});
