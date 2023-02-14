import { subscriptionsType } from '../../types'

export type DesktopProps = {
  subscriptions: subscriptionsType
  activeOrganization?: string
  loader: boolean
}
