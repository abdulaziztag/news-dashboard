import { useState } from 'react'
import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { DesktopNav } from './components/DesktopNav'
import { MobileNav } from './components/MobileNav'
import { useDocumentTitle } from 'hooks'

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useDocumentTitle('Dashboard • Rella')

  return (
    <div>
      <MobileNav flag={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DesktopNav />
      <div className="flex flex-1 flex-col md:pl-72">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex py-6 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-52">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
