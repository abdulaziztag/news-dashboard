import * as z from 'zod'

export const registerUserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string(),
    email: z.string().email('Wrong email format!'),
    password: z.string().min(6, 'Password should be more than 6 symbols'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'The passwords did not match',
      })
    }
  })
