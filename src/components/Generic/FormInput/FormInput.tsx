import { Controller, FieldValues } from 'react-hook-form'

import { Input } from '../Input'

import { FormInputProps } from './types'
import cx from 'classnames'

export const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  type,
  errors,
  className,
  id,
  label,
  ...props
}: FormInputProps<T>) => {
  const errorMessages = errors?.[name]

  return (
    <div className={cx({ relative: errors }, className)}>
      {label && (
        <label
          className="block mb-2 text-slate-700 font-medium"
          htmlFor={id}
          aria-required={Boolean(label)}
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            id={id}
            type={type}
            hasError={!!errorMessages}
            {...field}
            {...props}
          />
        )}
        rules={rules}
      />
      {errorMessages && (
        <p
          role="alert"
          className="inline-block before:content-['⚠_'] text-red-600 text-sm"
        >
          {errorMessages.message}
        </p>
      )}
    </div>
  )
}
