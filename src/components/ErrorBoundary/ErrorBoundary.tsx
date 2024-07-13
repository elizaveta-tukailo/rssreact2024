import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../../pages/error-page/ErrorPage';

interface Props {
  children?: ReactNode;
}
export interface HasState {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, HasState> {
  public state: HasState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): HasState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
