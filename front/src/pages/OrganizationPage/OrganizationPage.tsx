import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getOrganizationById } from 'api/organization'
import { useState } from 'react'
import { Organization } from 'interfaces'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import { toast } from 'react-toastify'
import { getSubscriptions, subscribe, unsubscribe } from 'api/user'
import { Button } from 'components/Generic/Button'

export const OrganizationPage = () => {
  const { organizationId } = useParams()
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
          // @ts-ignore
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

  const { isFetching } = useQuery({
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
    <div className="flex justify-center">
      {isFetching ? (
        <ClipLoader size={150} color={colors.primary} />
      ) : (
        <div>
          {organization?.name} {organization?.linkedin}
          <Button
            variant={isSubscribed ? 'info' : 'success'}
            onClick={toggleSubscription}
          >
            {unsubscribeMutation.isLoading || subscribeMutation.isLoading ? (
              <ClipLoader color={colors.white} />
            ) : isSubscribed ? (
              'Subscribed'
            ) : (
              'Subscribe'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
