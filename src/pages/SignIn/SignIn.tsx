import { Button } from '../../components/Generic/Button'
import { Input } from '../../components/Generic/Input'
import { FormInput } from '../../components/Generic/FormInput/FormInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './utils/schema'
import { signInFormData } from './types'

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
  } = useForm<signInFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signIn = ({ email, password }: signInFormData) => {
    console.log(email, password)
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
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            start your 14-day free trial
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={() => handleSubmit(signIn)}>
          <FormInput<signInFormData>
            label="Email"
            name="email"
            placeholder="Email"
            control={control}
            rules={{
              required: 'Email is required',
            }}
            id="email"
            errors={errors}
          />
          <FormInput<signInFormData>
            label="Password"
            name="password"
            placeholder="password"
            type="password"
            control={control}
            id="password"
            rules={{
              required: 'Password is required',
            }}
            errors={errors}
          />

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

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button variant="primary" type="submit" className="w-full">
              Sign in
            </Button>
          </div>
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

          <Button
            variant="light"
            className="w-full mt-3 focus:ring-black"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
