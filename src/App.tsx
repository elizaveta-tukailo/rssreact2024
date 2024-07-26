import MainPage from './pages/main-page';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/not-found-page';
import Layout from './components/Layout';
import Card from './components/Card';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

interface RouteType {
  path: string;
  element: React.ReactNode;
  children?: RouteType[];
}

interface RenderRoutesProps {
  routes: RouteType[];
}

const routes: RouteType[] = [
  {
    path: '/',
    element: (
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    ),
    children: [
      {
        path: '/',
        element: <MainPage />,
        children: [{ path: 'details/:peopleId', element: <Card /> }],
      },
      {
        path: 'page/:id',
        element: <MainPage />,
        children: [{ path: 'details/:peopleId', element: <Card /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

const renderRoutes: React.FC<RenderRoutesProps> = ({ routes }) => {
  return (
    <>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children && renderRoutes({ routes: route.children })}
        </Route>
      ))}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes>{renderRoutes({ routes })}</Routes>
    </ErrorBoundary>
  );
};

export default App;
