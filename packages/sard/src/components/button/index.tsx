import { CSSProperties, ReactNode, FC, MouseEvent } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { Loading, LoadingProps } from '../loading'

export interface ButtonProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  type?: 'primary' | 'secondary' | 'mild' | 'outlined' | 'text' | 'pale-text'
  theme?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark'
  size?: 'medium' | 'small' | 'large'
  rounded?: boolean
  block?: boolean
  disabled?: boolean
  loading?: boolean
  loadingText?: ReactNode
  loadingProps?: LoadingProps
  onClick?: (event: MouseEvent) => void
  [propName: string]: any
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    type = 'primary',
    theme = 'primary',
    size = 'medium',
    rounded = false,
    block = false,
    disabled = false,
    loading = false,
    loadingText,
    loadingProps,
    onClick,
    ...restProps
  } = props

  const handleClick = (event: MouseEvent) => {
    if (disabled || loading) {
      return
    }
    onClick?.(event)
  }

  const buttonClass = classNames(
    's-button',
    's-button-' + (type !== 'primary' ? type + '-' : '') + theme,
    {
      ['s-button-' + size]: size !== 'medium',
      's-button-rounded': rounded,
      's-button-block': block,
      's-button-disabled': disabled,
      's-button-loading': loading,
    },
    className,
  )

  return (
    <button
      {...restProps}
      className={buttonClass}
      disabled={disabled}
      onClick={handleClick}
    >
      <div className="s-button-content">
        {loading ? (
          <>
            <Loading {...loadingProps}></Loading>
            {loadingText && (
              <span className="s-button-loading-text">{loadingText}</span>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </button>
  )
}

export default Button
