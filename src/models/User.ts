import { Schema, model } from 'mongoose'
import { IUser } from '@/interfaces'

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser>('User', userSchema)
