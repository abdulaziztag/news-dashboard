import { forwardRef } from 'react'
import { InputProps } from './types'
import cx from 'classnames'
import { InputSizes } from './utils/sizes'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, size = 'md', type = 'text', className, hasError, ...props },
    ref
  ) => {
    const classes = cx(
      'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
      InputSizes[size],
      className,
      hasError &&
        'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
    )

    return (
      <input
        id={id}
        className={classes}
        name={name}
        ref={ref}
        type={type}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
