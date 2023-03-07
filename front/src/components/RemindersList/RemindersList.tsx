import { RemindersListProps } from './types'
import { colors } from 'constants/colors'
import { ClipLoader } from 'react-spinners'
import { ReminderContent } from 'components/ReminderContent'
import { getCorrectTimezone } from 'helpers/getCorrectTimezone'

export const RemindersList = ({
  reminders,
  noRemindersText,
  loader,
  refetch,
}: RemindersListProps) => {
  return (
    <>
      {loader ? (
        <ClipLoader color={colors.primary} size={75} />
      ) : reminders.length === 0 ? (
        <div className="text-lg font-semibold text-gray-500">
          {noRemindersText}
        </div>
      ) : (
        reminders.map((reminder) => (
          <ReminderContent
            expiresDate={getCorrectTimezone(reminder.expiresDate).getTime()}
            repeatValue={reminder.repeatValue}
            notes={reminder.notes}
            organizationInfo={reminder.organizationInfo}
            organizationId={reminder.organizationId}
            title={reminder.title}
            _id={reminder._id}
            key={reminder._id}
            changeReminders={() => refetch()}
          />
        ))
      )}
    </>
  )
}
