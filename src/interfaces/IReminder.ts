import { Types } from 'mongoose'

export interface IReminder {
  email: string
  organizationId: Types.ObjectId
  expiresDate: number
  notes?: string
  repeatValue?: number
  title?: string
}

export interface IReminderForEmail {
  organizationName: string
  email: string
  value: BingResponseInterface[]
  notes?: string
}

export interface BingResponseInterface {
  name: string
  url: string
  image: {
    thumbnail: {
      contentUrl: string
    }
  }
  description: string
  dataPublished: string
}
