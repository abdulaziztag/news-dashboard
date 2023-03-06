import { Input } from 'components/Generic/Input'
import { ChangeEvent, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Button } from 'components/Generic/Button'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setReminder } from 'api/user'
import { toast } from 'react-toastify'
import { AddReminderProps, reminderType } from './types'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
import cx from 'classnames'

export const AddReminder = ({ onClose }: AddReminderProps) => {
  const { organizationId } = useParams<keyof { organizationId: string }>() as {
    organizationId: string
  }
  const queryClient = useQueryClient()
  const [date, setDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState('')
  const [title, setTitle] = useState('')
  const [time, setTime] = useState(new Date())
  const [activeRepeatVariant, setActiveRepeatVariant] = useState<reminderType>({
    title: 'Once',
  })
  const [repeatVariants] = useState<reminderType[]>([
    {
      title: 'Once',
    },
    {
      title: 'Daily',
      repeatValue: 24 * 60 * 60 * 1000,
    },
    {
      title: 'Weekly',
      repeatValue: 7 * 24 * 60 * 60 * 1000,
    },
    {
      title: 'Monthly',
      repeatValue: 30 * 24 * 60 * 60 * 1000,
    },
  ])

  const { mutate, isLoading } = useMutation({
    mutationFn: setReminder,
    onSuccess: async (data) => {
      onClose()
      toast(data.data.message, {
        type: 'success',
      })
      await queryClient.invalidateQueries(['reminders'])
    },
    onError: (error: Error) => {
      toast(error.message, {
        type: 'error',
      })
    },
  })

  const handeDateInput = (selectedDate: Date) => {
    setDate(selectedDate)
  }

  const handleTitleInput = (inputData: ChangeEvent<HTMLInputElement>) => {
    setTitle(inputData.target.value)
  }

  const handleNotesInput = (inputData: ChangeEvent<HTMLInputElement>) => {
    setNotes(inputData.target.value)
  }

  const handleSubmit = () => {
    const correctDate = date
    const timezoneOffset = correctDate.getTimezoneOffset() * 60 * 1000
    correctDate.setMinutes(0)
    correctDate.setHours(time.getHours())
    correctDate.setSeconds(0)
    correctDate.setTime(correctDate.getTime() + timezoneOffset)

    mutate({
      expiresDate: correctDate.getTime(),
      notes,
      organizationId,
      repeatValue: activeRepeatVariant.repeatValue,
      title,
    })
  }

  return (
    <div className="mt-3 flex gap-y-5 flex-col">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select date
        </label>
        <DatePicker
          minDate={new Date()}
          selected={date}
          onChange={handeDateInput}
          customInput={<Input id="date" name="date" />}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select time
        </label>
        <DatePicker
          selected={time}
          onChange={(date: Date) => setTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h aa"
          customInput={<Input id="date" name="date" />}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          placeholder="Title"
          onChange={handleTitleInput}
          value={title}
          className="mt-1"
          name="title"
          id="title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <Input
          placeholder="Notes"
          onChange={handleNotesInput}
          value={notes}
          className="mt-1"
          name="notes"
          id="notes"
        />
      </div>
      <div className="block text-sm font-medium text-gray-700">Repeat</div>
      <div className="flex justify-around">
        {repeatVariants.map((variant) => (
          <div
            className={cx(
              'px-4 py-2 border-2 rounded-lg cursor-pointer hover:bg-gray-300',
              activeRepeatVariant.title === variant.title &&
                'bg-primary text-white hover:bg-primary'
            )}
            key={variant.repeatValue || ''}
            onClick={() => setActiveRepeatVariant(variant)}
          >
            {variant.title}
          </div>
        ))}
      </div>
      <div className="flex gap-x-3 self-end">
        <Button onClick={onClose} variant="light">
          Close
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <ClipLoader color={colors.white} size={25} /> : 'Submit'}
        </Button>
      </div>
    </div>
  )
}
