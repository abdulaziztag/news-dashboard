import { Organization } from 'interfaces'

export type MainContentProps = {
  isSubscribed: boolean
  organization: Organization
  subscriptionLoader: boolean
  toggleSubscription: () => void
}
