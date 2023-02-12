import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { Button } from 'components/Generic/Button'
import { useQuery } from '@tanstack/react-query'
import { confirmAccount } from 'api/auth'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Spinner } from 'components/Generic/Spinner'
import { toast } from 'react-toastify'
import { routePaths } from '../../router/routes'
import { AxiosError } from 'axios'

export const ConfirmationPage = () => {
  const { code } = useParams()
  const navigate = useNavigate()

  const { isLoading } = useQuery({
    queryKey: ['confirmation', code],
    queryFn: confirmAccount,
    onError: (err: AxiosError) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      toast(err.response.data.message, {
        type: 'error',
      })
      navigate(routePaths.home)
    },
  })

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col py-5 items-center sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-xl sm:rounded-lg sm:px-10">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <CheckBadgeIcon className="w-36 text-success" />
            <h3 className="text-xl">Your email successfully confirmed!</h3>
            <Link to={routePaths.signIn} className="self-end mt-5">
              <Button>Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
