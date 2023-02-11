import { Types } from 'mongoose'

export type STATUS = 'Active' | 'Pending'

export interface UserPublic {
  firstName: string
  lastName: string
  email: string
}
export interface IUser extends UserPublic {
  password: string
  subscriptions: Types.ObjectId[]
}

export interface UserModel extends IUser {
  role: string
  status: STATUS
  confirmationCode: string
  userId?: Types.ObjectId
}

export interface UserForEmail extends UserPublic {
  confirmationCode: string
}
