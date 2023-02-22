import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getOrganizationById } from 'api/organization'
import { useState } from 'react'
import { Organization } from 'interfaces'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import { toast } from 'react-toastify'
import { getSubscriptions, subscribe, unsubscribe } from 'api/user'
import { MainContent } from './components/MainContent'

export const OrganizationPage = () => {
  const { organizationId } = useParams<keyof { organizationId: string }>() as {
    organizationId: string
  }
  const [organization, setOrganization] = useState<Organization>()
  const [subscriptions, setSubscriptions] = useState<string[]>([])
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  const subsQuery = useQuery({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
    onSuccess: (data) => {
      setSubscriptions(data.data.subscriptionsInfo.map((sub) => sub._id))
      setIsSubscribed(
        data.data.subscriptionsInfo
          .map((sub) => sub._id)
          .includes(organizationId)
      )
    },
  })

  const subscribeMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: async () => {
      await subsQuery.refetch()
    },
  })

  const unsubscribeMutation = useMutation({
    mutationFn: unsubscribe,
    onSuccess: async () => {
      await subsQuery.refetch()
    },
  })

  const { isFetching, isLoading } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: getOrganizationById,
    onSuccess: (data) => {
      setIsSubscribed(subscriptions.includes(data.data._id))
      setOrganization(data.data)
    },
    onError: (error: TypeError) => {
      toast(error.message, {
        type: 'error',
      })
    },
    enabled: subsQuery.isFetched,
  })

  const toggleSubscription = () => {
    if (!isSubscribed) subscribeMutation.mutate(organizationId)
    else unsubscribeMutation.mutate(organizationId)
  }

  return (
    <div className="flex justify-center w-full">
      {isFetching || isLoading ? (
        <ClipLoader size={150} color={colors.primary} />
      ) : (
        organization && (
          <MainContent
            subscriptionLoader={
              unsubscribeMutation.isLoading || subscribeMutation.isLoading
            }
            organizationLoader={isFetching || isLoading}
            organization={organization}
            isSubscribed={isSubscribed}
            toggleSubscription={toggleSubscription}
          />
        )
      )}
    </div>
  )
}
