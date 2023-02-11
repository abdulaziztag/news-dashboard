import { ButtonHTMLAttributes } from 'react'

export type ButtonSize = 'lg' | 'md' | 'sm'
export type ButtonVariant = 'primary' | 'error' | 'success' | 'info' | 'light'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variant?: ButtonVariant
}
