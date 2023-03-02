import { model, Schema } from 'mongoose'
import { IOrganization } from '@/interfaces/IOrganization.js'

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    otherSources: [
      {
        title: String,
        src: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Organization = model<IOrganization>('Organization', organizationSchema)
