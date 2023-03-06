import { ButtonProps } from './types'
import cx from 'classnames'
import { ButtonSizes } from './utils/sizes'
import { ButtonVariants } from './utils/variants'
import { ClipLoader } from 'react-spinners'
import { colors } from 'constants/colors'
export const Button = ({
  size = 'md',
  variant = 'primary',
  children,
  className,
  type = 'button',
  loader = false,
  ...restProps
}: ButtonProps) => {
  const classes = cx(
    'inline-flex justify-center items-center rounded-md border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    className,
    ButtonSizes[size],
    ButtonVariants[variant]
  )

  return (
    <button type={type} disabled={loader} className={classes} {...restProps}>
      {loader ? <ClipLoader size={25} color={colors.white} /> : children}
    </button>
  )
}
