import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import HookForm from './components/HookForm/HookForm';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: '/hook-form',
    element: <HookForm />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
