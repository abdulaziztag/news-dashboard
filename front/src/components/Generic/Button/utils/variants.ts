import { ButtonVariant } from '../types'

export const ButtonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  light: 'bg-white text-black hover:bg-gray-200 focus:ring-white',
}
