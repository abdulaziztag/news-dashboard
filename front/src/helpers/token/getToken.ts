import { cookies } from '../cookies'

export const getToken = (): { token: string } => ({
  token: cookies.get<string>('Token') ?? '',
})
