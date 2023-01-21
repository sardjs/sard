import { CSSProperties, memo, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { Icon, IconProps } from '../icon'
import { Badge, BadgeProps } from '../badge'

export interface TabbarItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  icon?: IconProps | ((active: boolean) => ReactNode)
  index?: number
  activeIndex?: number
  color?: string
  activeColor?: string
  badge?: BadgeProps
  onClick?: (index: number) => void
}

export const TabbarItem = memo((props: TabbarItemProps) => {
  const {
    className,
    style,
    children,
    icon,
    index,
    activeIndex,
    color,
    activeColor,
    badge,
    onClick,
    ...restProps
  } = props

  const handleClick = () => {
    onClick?.(index as number)
  }

  const active = index === activeIndex

  const tabbarClass = classNames(
    's-tabbar-item',
    {
      's-tabbar-item-active': active,
    },
    className,
  )

  const tabbarItemStyle = {
    color: active ? activeColor : color,
    ...style,
  }

  return (
    <div
      {...restProps}
      className={tabbarClass}
      style={tabbarItemStyle}
      onClick={handleClick}
    >
      <div className="s-tabbar-item-icon">
        {typeof icon === 'function' ? icon(active) : <Icon {...icon}></Icon>}
        <Badge {...badge} fixed></Badge>
      </div>
      <div className="s-tabbar-item-text">{children}</div>
    </div>
  )
})

export default TabbarItem
