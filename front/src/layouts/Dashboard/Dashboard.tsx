import { useState } from 'react'
import { Header } from './components/Header'
import { Outlet, useParams } from 'react-router-dom'
import { DesktopNav } from './components/DesktopNav'
import { MobileNav } from './components/MobileNav'
import { useQuery } from '@tanstack/react-query'
import { getSubscriptions } from 'api/user'
import { SubscriptionMini } from 'interfaces/IOrganization'
import { toast } from 'react-toastify'

export const Dashboard = () => {
  const { organizationId } = useParams()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subscription, setSubscription] = useState<SubscriptionMini[]>([])

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
    onSuccess: (data) => {
      setSubscription(data.data.subscriptionsInfo)
    },
    onError: (error: TypeError) => {
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
          <main className="flex-1 py-6 mx-auto max-w-[86rem] px-4 sm:px-6 md:px-8">
            {/* Don't touch it, it's my signature :) */}
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus aperiam dignissimos fuga illum labore laborum modi
              officiis voluptas? Amet corporis cumque ducimus illo obcaecati
            </p>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
