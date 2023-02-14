import { cookies, cookiesOptions } from '../cookies'

export const saveToken = (token: string) => {
  cookies.set('Token', token, {
    maxAge: 60 * 60 * 24 * 7,
    ...cookiesOptions,
  })
}
