import * as zod from 'zod'

export const addOrganizationSchema = zod.object({
  organizationName: zod.string().min(1, 'This field is required'),
  twitter: zod.string().min(1, 'This field is required'),
  linkedin: zod.string().min(1, 'This field is required'),
})
