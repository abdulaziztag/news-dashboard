import { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react'

export type InputSize = 'lg' | 'md' | 'sm'

export type InputTypes = 'text' | 'email' | 'password' | 'file' | 'number'

export type InputProps = {
  id: string
  name: string
  type?: InputTypes
  size?: InputSize
  ref?: Ref<HTMLInputElement> | undefined
  hasError?: boolean
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'id' | 'name' | 'type' | 'ref'
>
