import React from 'react';
import { render } from '@testing-library/react';
import { useTheme } from '../context/ThemeContext';
import Theme from '../components/Theme/Theme';
import styles from '../components/Theme/theme.module.css';

jest.mock('../context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('Testing Theme Component', () => {
  test('Check if theme applies the correct styles based on the theme', () => {
    const mockTheme = 'dark';
    (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });

    const { container } = render(
      <Theme>
        <div>Test Child</div>
      </Theme>
    );

    expect(container.firstChild).toHaveClass(styles.page);
    expect(container.firstChild).toHaveClass(styles[mockTheme]);
  });

  test('Check with another theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
    const { container: lightContainer } = render(
      <Theme>
        <div>Light Theme</div>
      </Theme>
    );

    expect(lightContainer.firstChild).toHaveClass(styles.page);
    expect(lightContainer.firstChild).toHaveClass(styles.light);

    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
    const { container: darkContainer } = render(
      <Theme>
        <div>Dark Theme</div>
      </Theme>
    );

    expect(darkContainer.firstChild).toHaveClass(styles.page);
    expect(darkContainer.firstChild).toHaveClass(styles.dark);
  });
});
