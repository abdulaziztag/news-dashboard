import { Organization } from 'interfaces'
import { NewsArticle } from 'types/BingResponseType'

export type bingNewsContainerProps = {
  containerTitle: string
  organization: Organization
  domain: string
  image: string
  headerClasses?: string
  onDataLoaded: (data: NewsArticle[]) => void
}
