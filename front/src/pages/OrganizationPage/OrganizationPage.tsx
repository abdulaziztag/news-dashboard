import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrganizationById } from 'api/organization'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import { toast } from 'react-toastify'
import { subscribe, unsubscribe } from 'api/user'
import { MainContent } from './components/MainContent'
import { routePaths } from 'router/routes'
import { useSubscriptions } from 'hooks'

export const OrganizationPage = () => {
  const { organizationId } = useParams<keyof { organizationId: string }>() as {
    organizationId: string
  }
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { subscriptions } = useSubscriptions()

  const subscribeMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['subscriptions'])
    },
  })

  const unsubscribeMutation = useMutation({
    mutationFn: unsubscribe,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['subscriptions'])
    },
  })

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: getOrganizationById,
    onError: (error: TypeError) => {
      toast(error.message, {
        type: 'error',
      })
      navigate(routePaths.dashboard)
    },
  })

  const toggleSubscription = () => {
    const isSubscribed = subscriptions
      .map((sub) => sub._id)
      .includes(data ? data.data._id : '')
    if (!isSubscribed) subscribeMutation.mutate(organizationId)
    else unsubscribeMutation.mutate(organizationId)
  }

  return (
    <div className="flex justify-center w-full">
      {isFetching || isLoading ? (
        <ClipLoader size={150} color={colors.primary} />
      ) : (
        data && (
          <MainContent
            subscriptionLoader={
              unsubscribeMutation.isLoading || subscribeMutation.isLoading
            }
            organization={data.data}
            isSubscribed={
              data
                ? subscriptions.map((sub) => sub._id).includes(data.data._id)
                : false
            }
            toggleSubscription={toggleSubscription}
          />
        )
      )}
    </div>
  )
}
