import { Outlet } from 'react-router-dom'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export const Main = () => {
  return (
    <div className="bg-white relative overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
