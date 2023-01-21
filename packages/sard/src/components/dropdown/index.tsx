import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { DropdownItem } from './Item'
import { DropdownOption } from './Option'

export * from './Item'
export * from './Option'

export interface DropdownProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface DropdownFC extends FC<DropdownProps> {
  Item: typeof DropdownItem
  Option: typeof DropdownOption
}

export const Dropdown: DropdownFC = (props) => {
  const { className, children, ...restProps } = props

  const dropdownClass = classNames('s-dropdown', className)

  return (
    <div {...restProps} className={dropdownClass}>
      {children}
    </div>
  )
}

Dropdown.Item = DropdownItem
Dropdown.Option = DropdownOption

export default Dropdown
