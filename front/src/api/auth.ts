import { signUpFormData } from 'pages/SignUp'
import { endpoints } from './endpoints'
import { QueryFunctionContext } from '@tanstack/react-query'
import axiosInstance from './axiosIntance'
import { signInFormData } from 'pages/SignIn'
import { ResponseError } from 'types/ErrorsType'
import { SimpleMessageType } from 'types/SimpleMessageType'
import { AxiosResponse } from 'axios'

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: signUpFormData) => {
  return await axiosInstance.post<AxiosResponse | ResponseError>(
    endpoints.signUp,
    {
      firstName,
      lastName,
      email,
      password,
    }
  )
}

export const signIn = async ({ email, password }: signInFormData) => {
  return await axiosInstance.post<{ token: string } | ResponseError>(
    endpoints.signIn,
    {
      email,
      password,
    }
  )
}

export const confirmAccount = async ({ queryKey }: QueryFunctionContext) => {
  return await axiosInstance.post<SimpleMessageType | ResponseError>(
    endpoints.confirm,
    {
      confirmationCode: queryKey[1],
    }
  )
}
