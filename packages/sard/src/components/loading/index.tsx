import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface LoadingProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  type?: 'border' | 'clock'
  color?: string
  size?: string | number
  text?: string
  vertical?: boolean
}

export const Loading: FC<LoadingProps> = (props) => {
  const {
    className,
    style,
    children,
    type = 'border',
    color = '',
    size = '',
    text = '',
    vertical = false,
    ...restProps
  } = props

  const loadingClass = classNames(
    's-loading',
    {
      's-loading-vertical': vertical,
    },
    className,
  )
  const loadingStyle = {
    color,
    ...style,
  }
  const spinnerClass = classNames(
    's-loading-spinner',
    's-loading-spinner-' + type,
  )
  const spinnerStyle = {
    fontSize: size,
  }

  return (
    <div {...restProps} className={loadingClass} style={loadingStyle}>
      <div className={spinnerClass} style={spinnerStyle}>
        {type === 'clock' &&
          Array(12)
            .fill(0)
            .map((_, i) => <div key={i} className="s-loading-scale"></div>)}
      </div>
      {(children || text) && (
        <div className="s-loading-text">{children || text}</div>
      )}
    </div>
  )
}

export default Loading
