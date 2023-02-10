import { ButtonProps } from './types'
import cx from 'classnames'
import { ButtonSizes } from './utils/sizes'
import { ButtonVariants } from './utils/variants'
export const Button = ({
  size = 'md',
  variants = 'primary',
  children,
  className,
  type = 'button',
  ...restProps
}: ButtonProps) => {
  const classes = cx(
    'inline-flex items-center rounded-md border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    className,
    ButtonSizes[size],
    ButtonVariants[variants]
  )

  return (
    <button type={type} className={classes} {...restProps}>
      {children}
    </button>
  )
}
