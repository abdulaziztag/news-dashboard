import axiosInstance from './axiosInstance'
import { Organization, SubscriptionMini } from '../interfaces'
import { endpoints } from './endpoints'
import { QueryFunctionContext } from '@tanstack/react-query'

export const getOrganizationById = async ({
  queryKey,
}: QueryFunctionContext) => {
  return await axiosInstance.post<Organization>(endpoints.getOrganizationInfo, {
    organizationId: queryKey[1],
  })
}

export const searchOrganization = async (query: string) => {
  return await axiosInstance.post<SubscriptionMini[]>(
    endpoints.searchOrganization,
    {
      organizationName: query,
    }
  )
}
