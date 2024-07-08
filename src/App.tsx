import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import './App.css';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
