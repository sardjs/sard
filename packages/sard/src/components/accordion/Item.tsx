import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { Icon } from '../icon'
import { Collapse } from '../collapse'

export interface AccordionItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  icon?: ReactNode | ((active: boolean) => ReactNode)
  tabKey?: string | number
  activeKey?: string | number | (string | number)[]
  disabled?: boolean
  duration?: number
  onClick?: () => void
}

export const AccordionItem: FC<AccordionItemProps> = (props) => {
  const {
    className,
    children,
    title,
    icon,
    tabKey,
    activeKey,
    disabled,
    duration = 300,
    onClick,
    ...restProps
  } = props

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
    }
  }

  const active = Array.isArray(activeKey)
    ? activeKey.includes(tabKey)
    : tabKey === activeKey

  const itemClass = classNames(
    's-accordion-item',
    {
      's-accordion-item-active': active,
      's-accordion-item-disabled': disabled,
    },
    className,
  )

  return (
    <div {...restProps} className={itemClass}>
      <div className="s-accordion-item-header" onClick={handleClick}>
        <div className="s-accordion-item-title">{title}</div>
        <div className="s-accordion-item-icon">
          {typeof icon === 'function'
            ? icon(active)
            : icon ?? (
                <Icon
                  className="s-accordion-item-arrow"
                  prefix="si"
                  name="down"
                ></Icon>
              )}
        </div>
      </div>
      <Collapse
        timeout={duration}
        visible={active}
        className="s-accordion-item-wrapper"
      >
        <div className="s-accordion-item-content">{children}</div>
      </Collapse>
    </div>
  )
}

export default AccordionItem
