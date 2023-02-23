import { Schema, model } from 'mongoose'
import { UserModel } from '@/interfaces'
import bcrypt from 'bcrypt'

const userSchema = new Schema<UserModel>(
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
      set(password: string) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
      },
    },
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending',
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<UserModel>('User', userSchema)
