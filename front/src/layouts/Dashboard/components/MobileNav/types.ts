import { subscriptionsType } from '../../types'

export type MobileNavProps = {
  subscriptions: subscriptionsType
  flag: boolean
  setSidebarOpen(flag: boolean): void
  activeOrganization?: string
}
