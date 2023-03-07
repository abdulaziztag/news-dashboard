import { useQuery } from '@tanstack/react-query'
import { checkAuth } from '../api/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useCheckAuth = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
    onError: () => {
      toast('Please sign in', {
        type: 'error',
      })
      navigate('/auth/signin')
    },
    staleTime: Infinity,
  })

  return {
    authLoader: isLoading,
    user: data?.data,
  }
}
