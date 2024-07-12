import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/main-page';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};
export default App;
