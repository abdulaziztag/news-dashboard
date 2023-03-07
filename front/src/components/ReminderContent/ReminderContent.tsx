import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ReminderContentProps } from './types'
import { ModalDialog } from '../Generic/ModalDialog'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteReminder } from 'api/user'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const ReminderContent = ({
  organizationInfo,
  notes,
  expiresDate,
  repeatValue,
  _id = '',
  changeReminders,
  title,
}: ReminderContentProps) => {
  const [deleteReminderDialog, setDeleteReminderDialog] = useState(false)
  const [editReminderDialog, setEditReminderDialog] = useState(false)

  const deleteMutation = useMutation({
    mutationFn: deleteReminder,
    onSuccess: (data) => {
      if (changeReminders) {
        changeReminders()
      }
      toast(data.data.message, {
        type: 'success',
      })
    },
    onError: (error: AxiosError) => {
      toast(error.message, {
        type: 'error',
      })
    },
  })

  const submitDeleting = () => {
    deleteMutation.mutate(_id)
    setDeleteReminderDialog(false)
  }

  return (
    <div className="w-full flex px-4 py-3 items-center justify-between shadow-lg rounded-xl border-2">
      <ModalDialog
        isOpen={deleteReminderDialog}
        title="Delete follow-up"
        body="Are you sure to delete this follow-up?"
        onClose={() => setDeleteReminderDialog(false)}
        onSubmit={submitDeleting}
        submitLoader={deleteMutation.isLoading}
      />
      <ModalDialog
        isOpen={editReminderDialog}
        title="Edit reminder"
        body="Available soon..."
        onClose={() => setEditReminderDialog(false)}
      />
      <div className="flex flex-col h-full justify-center">
        <h2 className="text-xl font-semibold capitalize">{title}</h2>
        <div className="flex flex-col gap-x-2">
          {notes && <span className="">- Notes: {notes}</span>}
          <span className="">- Organization: {organizationInfo.name}</span>
          <span className="">
            - Repeat:{' '}
            {!repeatValue ? 'Once' : `Every ${repeatValue / 86400000} day(s)`}
          </span>
          <span className="">
            - Next reminder:{' '}
            {new Date(expiresDate).toLocaleDateString('en-US', {
              hour: 'numeric',
            })}
          </span>
        </div>
      </div>
      <div className="h-full flex flex-row items-center gap-x-2">
        <div
          className="border-2 p-2 rounded-xl border-amber-500 text-amber-500 hover:bg-amber-100"
          onClick={() => setEditReminderDialog(true)}
        >
          <PencilIcon className="h-6" />
        </div>
        <div
          className="border-2 p-2 rounded-xl border-red-500 text-red-500 hover:bg-red-100"
          onClick={() => setDeleteReminderDialog(true)}
        >
          <TrashIcon className="h-6" />
        </div>
      </div>
    </div>
  )
}
