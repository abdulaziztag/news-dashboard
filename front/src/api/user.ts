import axiosInstance from './axiosInstance'
import { endpoints } from './endpoints'
import { SubscriptionMini } from 'interfaces/IOrganization'
import { SimpleMessageType } from 'types/SimpleMessageType'

export const getSubscriptions = async () => {
  return await axiosInstance.get<{ subscriptionsInfo: SubscriptionMini[] }>(
    endpoints.subscriptions
  )
}

export const subscribe = async (organizationId?: string) => {
  return await axiosInstance.post<SimpleMessageType>(endpoints.subscribe, {
    organizationId,
  })
}

export const unsubscribe = async (organizationId?: string) => {
  return await axiosInstance.post<SimpleMessageType>(endpoints.unsubscribe, {
    organizationId,
  })
}
