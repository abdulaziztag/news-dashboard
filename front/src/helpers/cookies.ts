import Cookies, { CookieSetOptions } from 'universal-cookie'

export const cookies = new Cookies()

export const cookiesOptions: CookieSetOptions = {
  secure: true,
  sameSite: true,
  path: '/',
}
