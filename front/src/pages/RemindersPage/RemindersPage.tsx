import { useQuery } from '@tanstack/react-query'
import { getReminders } from 'api/user'
import { RemindersList } from 'components/RemindersList'

export const RemindersPage = () => {
  const { isLoading, data, isRefetching, refetch } = useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
    staleTime: Infinity,
  })

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="text-3xl font-semibold">Follow-ups</div>
      <div className="flex flex-col items-center gap-y-4 mt-2">
        <RemindersList
          reminders={(data && data.data) || []}
          noRemindersText="There is no follow-ups. You can create them in organization page."
          loader={isLoading || isRefetching}
          refetch={refetch}
        />
      </div>
    </div>
  )
}
