import axiosInstance from './axiosInstance'
import { Organization, SubscriptionMini } from '../interfaces'
import { endpoints } from './endpoints'
import { QueryFunctionContext } from '@tanstack/react-query'
import { SearchResponse } from 'types/BingResponseType'
import axios from 'axios'
import { addOrganizationForm } from '../components/DialogContents/AddOrganization'

const bingAPI = '8943ddf85aa1412aaf0836799466e654'

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

export const getSourceFromBing = async ({ queryKey }: QueryFunctionContext) => {
  const [, companyTitle, source] = queryKey
  const currentDate = new Date()
  const threeMonthsAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 24,
    1
  )
  const sinceParam = Math.floor(threeMonthsAgo.getTime() / 1000)

  return await axios.get<SearchResponse>(
    'https://api.bing.microsoft.com/v7.0/news/search',
    {
      headers: {
        'Ocp-Apim-Subscription-Key': bingAPI,
      },
      params: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        q: `site:${source} ${companyTitle}`,
        count: 15,
        mkt: 'en-US',
        safeSearch: 'Off',
        sortBy: 'Date',
        since: sinceParam,
      },
    }
  )
}

export const addOrganization = async ({
  organizationName,
  twitter,
  linkedin,
}: addOrganizationForm) => {
  return await axiosInstance.post<{
    message: string
    organizationsIds: string[]
  }>(endpoints.addOrganization, [
    {
      name: organizationName,
      twitter,
      linkedin,
    },
  ])
}
