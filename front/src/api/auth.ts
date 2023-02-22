import { signUpFormData } from 'pages/SignUp'
import { endpoints } from './endpoints'
import { QueryFunctionContext } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { signInFormData } from 'pages/SignIn'
import { SimpleMessageType } from 'types/SimpleMessageType'
import { IUser } from 'interfaces'

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: signUpFormData) => {
  return await axiosInstance.post<SimpleMessageType>(endpoints.signUp, {
    firstName,
    lastName,
    email,
    password,
  })
}

export const signIn = async ({ email, password }: signInFormData) => {
  return await axiosInstance.post<{ token: string }>(endpoints.signIn, {
    email,
    password,
  })
}

export const confirmAccount = async ({ queryKey }: QueryFunctionContext) => {
  return await axiosInstance.post<SimpleMessageType>(endpoints.confirm, {
    confirmationCode: queryKey[1],
  })
}

export const checkAuth = async () => {
  return await axiosInstance.get<IUser>(endpoints.checkUser)
}
