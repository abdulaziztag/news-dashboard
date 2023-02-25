import { useQuery } from '@tanstack/react-query'
import { checkAuth } from 'api/auth'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUser } from 'interfaces'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<IUser>()

  useQuery({
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
    onSuccess: (data) => {
      setUser(data.data)
    },
    onError: () => {
      toast('Please sign in', {
        type: 'error',
      })
      navigate('/auth/signin')
    },
  })
  return (
    <div className="border-2 border-red-600 w-full">
      Profile {user?.email} {user?.firstName} {user?.lastName}
    </div>
  )
}
