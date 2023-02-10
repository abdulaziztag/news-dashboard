import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from 'pages/ErrorPage'
import { HomePage } from 'pages/HomePage'
import { Main } from 'layouts/Main'
import { Auth } from 'layouts/Auth'
import { Dashboard } from '../layouts/Dashboard'

export const router = createBrowserRouter([
  {
    path: '',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signin',
        element: <div>Login</div>,
      },
      {
        path: 'signup',
        element: <div>signup</div>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
])
