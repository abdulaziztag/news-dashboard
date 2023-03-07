import { IReminder } from 'interfaces'

export type ReminderContentProps = IReminder & {
  organizationInfo: {
    name: string
  }
  changeReminders?: () => void
}
