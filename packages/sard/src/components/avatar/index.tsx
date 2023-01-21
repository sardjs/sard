import { CSSProperties, FC, ReactNode, useContext } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { Icon, IconProps } from '../icon'

import { AvatarGroup } from './Group'

export * from './Group'

export interface AvatarProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  shape?: 'circle' | 'square'
  size?: number | string
  fontSize?: number | string
  src?: string
  iconProps?: IconProps
  extra?: ReactNode
}

export interface AvatarFC extends FC<AvatarProps> {
  Group: typeof AvatarGroup
}

export const Avatar: AvatarFC = (props) => {
  const {
    className,
    style,
    children,
    shape = 'circle',
    size,
    fontSize,
    src,
    iconProps,
    extra,
    ...restProps
  } = props

  const avatarClass = classNames('s-avatar', 's-avatar-' + shape, className)

  const avatarStyle = {
    width: size,
    height: size,
    fontSize,
    ...style,
  }

  return (
    <div {...restProps} className={avatarClass} style={avatarStyle}>
      {children ||
        (src ? (
          <img src={src} className="s-avatar-img" />
        ) : (
          <Icon prefix="si" name="person"></Icon>
        ))}
      {extra}
    </div>
  )
}

Avatar.Group = AvatarGroup

export default Avatar
