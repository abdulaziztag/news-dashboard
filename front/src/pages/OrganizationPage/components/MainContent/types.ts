import { Organization } from 'interfaces'

export type MainContentProps = {
  isLoading: boolean
  organization?: Organization
  isSubscribed: boolean
  toggleSubscription: () => void
}
