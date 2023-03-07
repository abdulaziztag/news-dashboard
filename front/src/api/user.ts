import axiosInstance from './axiosInstance'
import { endpoints } from './endpoints'
import { SubscriptionMini } from 'interfaces/IOrganization'
import { SimpleMessageType } from 'types/SimpleMessageType'
import { IReminder } from '../interfaces'

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

export const setReminder = async (reminder: IReminder) => {
  return await axiosInstance.post<SimpleMessageType>(
    endpoints.reminder,
    reminder
  )
}

export const getReminders = async () => {
  return await axiosInstance.get<
    (IReminder & {
      organizationInfo: {
        name: string
      }
    })[]
  >(endpoints.reminder)
}

export const deleteReminder = async (reminderId: string) => {
  return await axiosInstance.delete<SimpleMessageType>(endpoints.reminder, {
    data: {
      reminderId,
    },
  })
}
