import { useState } from 'react'
import { Header } from './components/Header'
import { Outlet, useParams } from 'react-router-dom'
import { DesktopNav } from './components/DesktopNav'
import { MobileNav } from './components/MobileNav'
import { useQuery } from '@tanstack/react-query'
import { getSubscriptions } from 'api/user'
import { SubscriptionMini } from 'interfaces/IOrganization'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useDocumentTitle } from 'hooks'

export const Dashboard = () => {
  const { organizationId } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subscription, setSubscription] = useState<SubscriptionMini[]>([])

  useDocumentTitle('Dashboard • Rella')

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
    onSuccess: (data) => {
      setSubscription(data.data.subscriptionsInfo)
    },
    onError: (error: AxiosError) => {
      error.response &&
        error.response.status !== 401 &&
        toast(error.message, {
          type: 'error',
        })
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
          loader={isLoading || isRefetching}
        />
        <DesktopNav
          subscriptions={subscription}
          activeOrganization={organizationId}
          loader={isLoading || isRefetching}
        />
        <div className="flex flex-1 flex-col md:pl-64">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex py-6 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-52">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
