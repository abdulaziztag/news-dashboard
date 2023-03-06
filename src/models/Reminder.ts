import { Schema, model } from 'mongoose'
import { IReminder } from '../interfaces/index.js'

const reminderSchema = new Schema<IReminder>({
  email: {
    type: String,
    required: true,
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  expiresDate: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  repeatValue: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
})

export const Reminder = model<IReminder>('Reminder', reminderSchema)
