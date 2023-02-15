import { RouterProvider } from 'react-router-dom'
import { router } from 'router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { getToken } from 'helpers/token/'
import jwtDecode from 'jwt-decode'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: 0,
      },
    },
  })

  useEffect(() => {
    const { token } = getToken()
    //console.log(jwtDecode(token))
  })

  return (
    <div className="h-full">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </div>
  )
}

export default App
