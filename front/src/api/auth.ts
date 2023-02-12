import { signUpFormData } from 'pages/SignUp'
import axios, { AxiosError } from 'axios'
import { domain, endpoints } from './endpoints'
import { QueryFunctionContext } from '@tanstack/react-query'

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: signUpFormData) => {
  return await axios.post<{ message: string }>(`${domain}${endpoints.signUp}`, {
    firstName,
    lastName,
    email,
    password,
  })
}

export const confirmAccount = async ({ queryKey }: QueryFunctionContext) => {
  return await axios.post<{ message: string } | AxiosError>(
    `${domain}${endpoints.confirm}`,
    {
      confirmationCode: queryKey[1],
    }
  )
}
