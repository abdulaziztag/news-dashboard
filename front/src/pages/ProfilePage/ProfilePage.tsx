import { useCheckAuth } from 'hooks'
import { useQuery } from '@tanstack/react-query'
import { getReminders } from 'api/user'
import { Link } from 'react-router-dom'
import { routePaths } from 'router/routes'
import { RemindersList } from 'components/RemindersList'
import { getCorrectTimezone } from 'helpers/getCorrectTimezone'

const noRemindersText = (
  <>
    There is no follow-ups today. Go to{' '}
    <Link className="font-bold" to={routePaths.reminders}>
      follow-ups
    </Link>{' '}
    page to see more
  </>
)
export const ProfilePage = () => {
  const { user } = useCheckAuth()
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
    staleTime: Infinity,
  })

  return (
    <div className="w-full">
      Profile {user?.email} {user?.firstName} {user?.lastName}
      <div className="flex flex-col gap-y-5">
        <h2 className="text-3xl font-semibold mt-5">Follow-ups for today</h2>
        <div className="flex items-center flex-col gap-y-5">
          <RemindersList
            reminders={
              (data &&
                data.data.filter((reminder) => {
                  const correctedTimezone = getCorrectTimezone(
                    reminder.expiresDate
                  )
                  const date = new Date(correctedTimezone)
                  return date.getDate() === new Date().getDate()
                })) ||
              []
            }
            noRemindersText={noRemindersText}
            loader={isLoading || isRefetching}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  )
}
