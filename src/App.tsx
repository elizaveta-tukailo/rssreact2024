import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import './App.css';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </>
  );
}
