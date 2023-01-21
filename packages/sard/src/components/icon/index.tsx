import { CSSProperties, FC } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface IconProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  name?: string
  fullName?: string
  prefix?: string
  family?: string
  divider?: string
  size?: string | number
  color?: string
  type?: 'default' | 'rounded' | 'circle'
  frameSize?: string | number
  frameColor?: string
  onClick?: () => void
}

export const Icon: FC<IconProps> = (props) => {
  const {
    className,
    style,
    name = '',
    fullName,
    prefix = '',
    family,
    divider = '-',
    size = '',
    color = '',
    type = 'default',
    frameSize = '30px',
    frameColor = '',
    ...restProps
  } = props

  const isImg = name.includes('/')

  const iconClass = classNames(
    's-icon',
    {
      [family || prefix]: !isImg,
      [fullName || prefix + divider + name]: !isImg,
      's-icon-frame': type !== 'default',
      ['s-icon-frame-' + type]: type !== 'default',
    },
    className,
  )
  const iconStyle = {
    fontSize: size,
    color: color,
    ...style,
  }
  if (type !== 'default') {
    iconStyle.width = iconStyle.height = frameSize
    if (frameColor) {
      iconStyle.backgroundColor = frameColor
    }
  }

  return (
    <i {...restProps} className={iconClass} style={iconStyle}>
      {isImg && <img className="s-icon-image" src={name} />}
    </i>
  )
}

export default Icon
