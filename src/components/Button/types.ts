import { ButtonHTMLAttributes } from 'react'

export type ButtonSize = 'lg' | 'md' | 'sm'
export type ButtonVariant = 'primary' | 'error' | 'success' | 'info'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variants?: ButtonVariant
}
