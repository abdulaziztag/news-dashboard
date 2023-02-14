import axiosIntance from './axiosIntance'
import { endpoints } from './endpoints'

export const getSubscriptions = async () => {
  return await axiosIntance.get(endpoints.subscriptions)
}
