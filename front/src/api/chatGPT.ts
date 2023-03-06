import axiosInstance from './axiosInstance'
import { endpoints } from './endpoints'
import { SimpleMessageType } from 'types/SimpleMessageType'

export const generateFromRequest = async (value: string) => {
  return await axiosInstance.post<SimpleMessageType>(endpoints.generate, {
    message: value,
  })
}
