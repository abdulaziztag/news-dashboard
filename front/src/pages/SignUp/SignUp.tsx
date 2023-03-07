import { Input } from 'components/Generic/Input'
import { Button } from 'components/Generic/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpFormData } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUserSchema } from './utils/schema'
import { Link, useNavigate } from 'react-router-dom'
import { routePaths } from 'router/routes'
import { useMutation } from '@tanstack/react-query'
import { signUp } from 'api/auth'
import { toast } from 'react-toastify'
import { ResponseError } from 'types/ErrorsType'
import image from 'assets/rella_logo.png'
import { useDocumentTitle } from 'hooks'

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormData>({
    resolver: zodResolver(registerUserSchema),
  })
  const navigate = useNavigate()
  useDocumentTitle('Sign Up')

  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast(data.data.message, {
        type: 'success',
      })
      navigate(routePaths.home)
    },
    onError: (error: ResponseError) => {
      toast(error.response.data.message, {
        type: 'error',
      })
    },
  })

  const submitHandler: SubmitHandler<signUpFormData> = (formData) => {
    mutate(formData)
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src={image} alt="Rella" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <Input
              id="firstName"
              placeholder="First name"
              type="text"
              className="mt-1"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <Input
              id="lastName"
              placeholder="Last name"
              type="text"
              className="mt-1"
              {...register('lastName', { required: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              placeholder="Confirm password"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            onClick={handleSubmit(submitHandler)}
            variant="primary"
            type="button"
            className="w-full h-12"
            loader={isLoading}
          >
            Sign up
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

          <Link to={routePaths.signIn}>
            <Button
              variant="light"
              className="w-full mt-3 focus:ring-black"
              type="submit"
            >
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
