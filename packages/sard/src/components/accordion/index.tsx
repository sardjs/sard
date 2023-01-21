import {
  CSSProperties,
  ReactNode,
  ReactElement,
  Children,
  cloneElement,
  FC,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'

import { AccordionItem, AccordionItemProps } from './Item'

export * from './Item'

interface AccordionBaseProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  duration?: number
}

interface AccordionSingleProps extends AccordionBaseProps {
  multiple?: false
  defaultActiveKey?: string | number
  activeKey?: string | number
  onChange?: (activeKey: string | number) => void
}

interface AccordionMultipleProps extends AccordionBaseProps {
  multiple?: true
  defaultActiveKey?: (string | number)[]
  activeKey?: (string | number)[]
  onChange?: (activeKey: (string | number)[]) => void
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

export interface AccordionFC extends FC<AccordionProps> {
  Item: typeof AccordionItem
}

export const Accordion: AccordionFC = (props) => {
  const {
    className,
    children,
    defaultActiveKey,
    activeKey,
    multiple = false,
    duration,
    onChange,
    ...restProps
  } = props

  const [innerKey, setInnerKey] = useControlledValue<
    (string | number)[] | string | number
  >(props, {
    defaultValuePropName: 'defaultActiveKey',
    valuePropName: 'activeKey',
    defaultValue: multiple ? [] : '',
  })

  const handleItemClick = (tabKey: string | number) => {
    let key: any
    if (Array.isArray(innerKey)) {
      key = innerKey.includes(tabKey)
        ? innerKey.filter((item: string | number) => item !== tabKey)
        : [...innerKey, tabKey]
    } else {
      key = tabKey !== innerKey ? tabKey : ''
    }
    setInnerKey(key)

    onChange?.(key)
  }

  const accordionClass = classNames('s-accordion', className)

  return (
    <div {...restProps} className={accordionClass}>
      {Children.map(
        children as ReactElement<AccordionItemProps>,
        (item: ReactElement<AccordionItemProps>, index: number) => {
          const tabKey = item.key ?? index
          return cloneElement(item, {
            tabKey,
            activeKey: innerKey,
            duration: item.props.duration ?? duration,
            onClick: () => handleItemClick(tabKey),
          })
        },
      )}
    </div>
  )
}

Accordion.Item = AccordionItem

export default Accordion
