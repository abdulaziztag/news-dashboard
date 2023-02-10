import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { ErrorPage } from 'pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'auth',
    element: (
      <div>
        Auth <Outlet />
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <div>Login</div>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <div>dashboard</div>,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
