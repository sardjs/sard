import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

const getRingPercent = (percent: number, r: number) => {
  const perimeter = Math.PI * 2 * r
  return (percent / 100) * perimeter + ' ' + perimeter
}

export interface ProgressCircleProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  percent?: number
  color?: string
  trackColor?: string
  size?: string
  thickness?: number
}

export const ProgressCircle: FC<ProgressCircleProps> = (props) => {
  const {
    className,
    style,
    children,
    percent = 0,
    color,
    trackColor,
    size = '100px',
    thickness = 4,
    ...restProps
  } = props

  const radius = 50 - thickness / 2
  const angle = (percent / 100) * 360
  const radian = (angle / 180) * Math.PI

  const progressClass = classNames(
    's-progress-circle',
    {
      's-progress-circle-percent-zero': percent <= 0,
    },
    className,
  )
  const progressStyle = {
    width: size,
    height: size,
    ...style,
  }

  const mask =
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e` +
    `%3ccircle stroke='black' fill='none' stroke-width='${thickness}' cx='50' cy='50' r='${radius}' /%3e%3c/svg%3e")`

  const trackStyle = {
    backgroundColor: trackColor,
    '-webkit-mask': mask,
    WebkitMask: mask,
    mask: mask,
  }

  const trailStyle = {
    color,
    backgroundImage: `conic-gradient(currentColor ${angle}deg, transparent 0)`,
  }

  const capStartStyle = {
    width: thickness + '%',
    height: thickness + '%',
  }

  const capEndStyle = {
    width: thickness + '%',
    height: thickness + '%',
    left: 50 + Math.sin(radian) * radius + '%',
    top: 50 - Math.cos(radian) * radius + '%',
  }

  return (
    <div {...restProps} className={progressClass} style={progressStyle}>
      <div className="s-progress-circle-track" style={trackStyle}>
        <div className="s-progress-circle-trail" style={trailStyle}>
          <div
            className="s-progress-circle-cap s-progress-circle-cap-start"
            style={capStartStyle}
          ></div>
          <div
            className="s-progress-circle-cap s-progress-circle-cap-end"
            style={capEndStyle}
          ></div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default ProgressCircle
