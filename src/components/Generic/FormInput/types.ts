import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

import { InputProps } from '../Input'

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>
  rules?: RegisterOptions
  control: Control<T>
  errors?: Partial<DeepMap<T, FieldError>>
  label?: string
} & Omit<InputProps, 'name' | 'hasError'>
