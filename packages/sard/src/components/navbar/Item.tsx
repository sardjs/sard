import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface NavbarItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onClick?: () => void
}

export const NavbarItem: FC<NavbarItemProps> = (props) => {
  const { className, children, onClick, ...restProps } = props

  const itemClass = classNames('s-navbar-item', className)

  return (
    <div {...restProps} className={itemClass} onClick={onClick}>
      {children}
    </div>
  )
}

export default NavbarItem
