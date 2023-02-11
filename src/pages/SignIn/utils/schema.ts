import * as zod from 'zod'

export const signInSchema = zod.object({
  email: zod.string().email('Wrong email format!'),
  password: zod.string().min(6, 'Password should be more than 6 symbols'),
})
