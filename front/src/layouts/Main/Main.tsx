import { Outlet } from 'react-router-dom'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { useQuery } from '@tanstack/react-query'
import { checkAuth } from 'api/auth'
import { useState } from 'react'

export const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const { isLoading } = useQuery({
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
    onSuccess: () => {
      setIsLoggedIn(true)
    },
  })

  return (
    <div className="bg-white relative overflow-hidden">
      <Header isLoggedIn={isLoggedIn} isLoading={isLoading} />
      <Outlet />
      <Footer />
    </div>
  )
}
