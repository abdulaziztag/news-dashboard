import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from 'pages/ErrorPage'
import { HomePage } from 'pages/HomePage'
import { Main } from 'layouts/Main'
import { Auth } from 'layouts/Auth'
import { Dashboard } from 'layouts/Dashboard'
import { SignIn } from 'pages/SignIn'
import { SignUp } from 'pages/SignUp'
import { ConfirmationPage } from 'pages/ConfirmationPage'
import { OrganizationPage } from 'pages/OrganizationPage'
import { ProfilePage } from 'pages/ProfilePage'
import { RemindersPage } from 'pages/RemindersPage'

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
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'confirmation/:code',
        element: <ConfirmationPage />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <ProfilePage />,
      },
      {
        path: 'organization/:organizationId',
        element: <OrganizationPage />,
      },
      {
        path: 'reminders',
        element: <RemindersPage />,
      },
    ],
  },
])
