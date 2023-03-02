import axios from 'axios'
import * as process from 'process'
import { BingResponseInterface } from '@/interfaces'

export const getNewsFromBing = async (organizationName: string, source: string) => {
  return await axios.get<{ value: BingResponseInterface[] }>('https://api.bing.microsoft.com/v7.0/news/search', {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_APIKEY,
    },
    params: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      q: `site:${source} ${organizationName}`,
      count: 11,
      offset: 0,
      mkt: 'en-US',
      safeSearch: 'Moderate',
      category: 'News',
      freshness: 'Month',
    },
  })
}
