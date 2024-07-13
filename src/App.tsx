import MainPage from './pages/main-page';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/not-found-page';
import Layout from './components/Layout';
import Card from './components/Card';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />}>
            <Route path="details/:peopleId" element={<Card />} />
          </Route>
          <Route path="page/:id" element={<MainPage />}>
            <Route path="details/:peopleId" element={<Card />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};
export default App;
