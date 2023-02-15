import axiosInstance from './axiosInstance'
import { Organization } from '../interfaces'
import { endpoints } from './endpoints'
import { QueryFunctionContext } from '@tanstack/react-query'

export const getOrganizationById = async ({
  queryKey,
}: QueryFunctionContext) => {
  return await axiosInstance.post<Organization>(endpoints.getOrganizationInfo, {
    organizationId: queryKey[1],
  })
}
