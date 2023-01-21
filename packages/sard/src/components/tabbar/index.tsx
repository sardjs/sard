import {
  CSSProperties,
  ReactNode,
  ReactElement,
  createContext,
  Children,
  cloneElement,
  FC,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { TabbarItem, TabbarItemProps } from './Item'

export * from './Item'

export interface TabbarContext {
  color?: string
  activeColor?: string
  activeIndex?: number
}

export const TabbarContext = createContext<TabbarContext>({} as TabbarContext)

export interface TabbarProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  color?: string
  activeColor?: string
  activeIndex?: number
  fixed?: boolean
  onChange?: (index: number) => void
}

export interface TabbarFC extends FC<TabbarProps> {
  Item: typeof TabbarItem
}

export const Tabbar: TabbarFC = (props) => {
  const {
    className,
    style,
    children,
    color,
    activeColor,
    activeIndex,
    fixed = true,
    onChange,
    ...restProps
  } = props

  const handleItemClick = (index: number, element: ReactNode) => {
    onChange?.(index)
    ;(element as ReactElement<TabbarItemProps>).props?.onClick?.(index)
  }

  const tabbarClass = classNames(
    's-tabbar',
    {
      's-tabbar-fixed': fixed,
    },
    className,
  )

  return (
    <div {...restProps} className={tabbarClass}>
      {Children.map(children, (element, index) =>
        cloneElement(element as React.ReactElement, {
          color,
          activeColor,
          index,
          activeIndex,
          onClick: (index: number) => handleItemClick(index, element),
        }),
      )}
    </div>
  )
}

Tabbar.Item = TabbarItem

export default Tabbar
