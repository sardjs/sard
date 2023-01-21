import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { NavbarItem } from './Item'

export * from './Item'

export interface NavbarProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  titleStyle?: CSSProperties
  left?: ReactNode
  right?: ReactNode
  flow?: boolean
}

export interface NavbarFC extends FC<NavbarProps> {
  Item: typeof NavbarItem
}

export const Navbar: NavbarFC = (props) => {
  const {
    className,
    style,
    children,
    title,
    titleStyle,
    left,
    right,
    flow = false,
    ...restProps
  } = props

  const navbarClass = classNames(
    's-navbar',
    {
      's-navbar-flow': flow,
    },
    className,
  )

  return (
    <div {...restProps} className={navbarClass}>
      {left && <div className="s-navbar-left">{left}</div>}
      <div className="s-navbar-content">
        {children ?? (
          <div className="s-navbar-title" style={titleStyle}>
            {title}
          </div>
        )}
      </div>
      {right && <div className="s-navbar-right">{right}</div>}
    </div>
  )
}

Navbar.Item = NavbarItem

export default Navbar
