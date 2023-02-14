import { useState } from 'react'
import { Header } from './components/Header'
import { Outlet, useParams } from 'react-router-dom'
import { DesktopNav } from './components/DesktopNav'
import { MobileNav } from './components/MobileNav'
import { useQuery } from '@tanstack/react-query'
import { getSubscriptions } from '../../api/user'

export const Dashboard = () => {
  const { organizationId } = useParams()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subscription, setSubscription] = useState([
    { title: 'Facebook', id: '123' },
  ])

  const { isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
    onSuccess: (data) => {
      //setSubscription(data.data)
      console.log(data.data)
    },
  })

  return (
    <>
      <div>
        <MobileNav
          subscriptions={subscription}
          flag={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeOrganization={organizationId}
        />

        {/* Static sidebar for desktop */}
        <DesktopNav
          subscriptions={subscription}
          activeOrganization={organizationId}
          loader={isLoading}
        />
        <div className="flex flex-1 flex-col md:pl-64">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
