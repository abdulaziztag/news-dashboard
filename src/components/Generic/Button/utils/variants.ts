import { ButtonVariant } from '../types'

export const ButtonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}
