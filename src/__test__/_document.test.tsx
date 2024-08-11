import { render } from '@testing-library/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import '@testing-library/jest-dom';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/app/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

const TestDocument = () => (
  <html>
    <head>
      <link rel="icon" href="/app/favicon.ico" />
    </head>
    <body>
      <div id="__next">
        <main />
        <script />
      </div>
    </body>
  </html>
);

describe('MyDocument', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<TestDocument />);
    expect(asFragment()).toMatchSnapshot();
  });
});
