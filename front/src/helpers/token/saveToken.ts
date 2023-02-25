import { cookies, cookiesOptions } from '../cookies'

export const saveToken = (token: string, maxAge?: number) => {
  cookies.set('Token', token, {
    maxAge: maxAge || 60 * 60 * 24 * 7,
    ...cookiesOptions,
  })
}
