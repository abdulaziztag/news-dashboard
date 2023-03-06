import { useQuery } from '@tanstack/react-query'
import { getSubscriptions } from 'api/user'
import { useCheckAuth } from './useCheckAuth'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const useSubscriptions = () => {
  const { user } = useCheckAuth()

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
    staleTime: Infinity,
    enabled: !!user,
    onError: (error: AxiosError) => {
      toast(error.message, {
        type: 'error',
      })
    },
  })

  return {
    subscriptions: (data && data.data.subscriptionsInfo) || [],
    subscriptionsLoader: isLoading,
    isRefetching,
  }
}
