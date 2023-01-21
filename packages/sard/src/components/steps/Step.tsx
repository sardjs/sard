import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { StepsStatus } from './index'
import { Icon } from '../icon'

export interface StepsStepProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode | ((status: StepsStatus) => ReactNode)
  icon?: ReactNode | ((status: StepsStatus) => ReactNode)
  status?: StepsStatus
  lineColor?: string
  disabled?: boolean
  onClick?: () => void
}

const statusIconMap = {
  finish: 'check-circle-fill',
  process: 'circle',
  wait: 'circle',
  error: 'x-circle',
}

export const StepsStep: FC<StepsStepProps> = (props) => {
  const {
    className,
    children,
    icon,
    status = 'wait',
    lineColor,
    disabled = false,
    onClick,
    ...restProps
  } = props

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
    }
  }

  const stepClass = classNames(
    's-steps-step',
    `s-steps-${status}`,
    {
      's-steps-disabled': disabled,
    },
    className,
  )

  const lineStyle = {
    backgroundColor: lineColor,
  }

  return (
    <div {...restProps} className={stepClass} onClick={handleClick}>
      <div className="s-steps-header">
        <div
          className="s-steps-line s-steps-line-before"
          style={lineStyle}
        ></div>
        <div className="s-steps-icon">
          {typeof icon === 'function'
            ? icon(status as StepsStatus)
            : icon ?? <Icon prefix="si" name={statusIconMap[status]}></Icon>}
        </div>
        <div
          className="s-steps-line s-steps-line-after"
          style={lineStyle}
        ></div>
      </div>
      <div className="s-steps-body">
        {typeof children === 'function'
          ? children(status as StepsStatus)
          : children}
      </div>
    </div>
  )
}

export default StepsStep
