import { Button } from 'components/Generic/Button'
import { Input } from 'components/Generic/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from './utils/schema'
import { signInFormData } from './types'
import { routePaths } from 'router/routes'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'api/auth'
import { ResponseError } from 'types/ErrorsType'
import { toast } from 'react-toastify'
import { Spinner } from 'components/Generic/Spinner'
import { saveToken } from 'helpers/token'

export const SignIn = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      navigate(routePaths.dashboard)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      saveToken(data.data.token)
    },
    onError: (error: ResponseError) => {
      toast(error.response.data.message, {
        type: 'error',
      })
    },
  })

  const submitHandler: SubmitHandler<signInFormData> = (formData) => {
    mutate(formData)
  }
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              placeholder="Email"
              className="mt-1"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/*TODO: Remember me*/}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit(submitHandler)}
            variant="primary"
            type="button"
            className="w-full h-12"
          >
            {isLoading ? <Spinner /> : 'Sign in'}
          </Button>
        </form>

        <div className="mt-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Link to={routePaths.signUp}>
            <Button
              variant="light"
              className="w-full mt-3 focus:ring-black"
              type="submit"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
