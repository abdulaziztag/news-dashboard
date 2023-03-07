import { IReminder } from 'interfaces'

export type RemindersListProps = {
  reminders: (IReminder & {
    organizationInfo: {
      name: string
    }
  })[]
  noRemindersText: JSX.Element | string
  loader: boolean
  refetch: () => Promise<unknown>
}
