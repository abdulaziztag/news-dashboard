import { ButtonVariant } from '../types'

export const ButtonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
  success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  error: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  light: 'bg-white text-black hover:bg-gray-200 focus:ring-white',
}
