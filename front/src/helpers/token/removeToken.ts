import { cookies, cookiesOptions } from '../cookies'

export const removeToken = () => {
  cookies.remove('Token', { ...cookiesOptions })
}
