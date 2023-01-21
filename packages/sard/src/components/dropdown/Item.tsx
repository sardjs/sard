import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { Popup } from '../popup'
import { DropdownOption } from './Option'
import { Icon } from '../icon'

import { DropdownOptionProps } from './Option'
import { useEvent } from '../../use'

export interface DropdownItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  label?: ReactNode
  placeholder?: ReactNode
  options?: DropdownOptionProps[]
  disabled?: boolean
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
}

export const DropdownItem: FC<DropdownItemProps> = (props) => {
  const {
    className,
    style,
    children,
    placeholder,
    options = [],
    disabled,
    value,
    defaultValue,
    onChange,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControlledValue<any>(props, {
    defaultValue: null,
  })

  const [visible, setVisible] = useState(false)

  const optionsRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  const handleItemClick = () => {
    setVisible(!visible)
  }

  const handleDocumentClick = useEvent((event: MouseEvent) => {
    if (
      visible &&
      !optionsRef.current?.contains(event.target as Node) &&
      !itemRef.current?.contains(event.target as Node)
    ) {
      setVisible(false)
    }
  })

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const handleOptionClick = (option: DropdownOptionProps) => {
    if (option.value !== innerValue) {
      setInnerValue(option.value)
    }

    setVisible(false)
  }

  const itemClass = classNames(
    's-dropdown-item',
    {
      's-dropdown-item-show': visible,
      's-dropdown-item-disabled': disabled,
    },
    className,
  )

  return (
    <>
      <div
        {...restProps}
        className={itemClass}
        ref={itemRef}
        onClick={handleItemClick}
      >
        {children && <div className="s-dropdown-item-label">{children}</div>}
        {(innerValue && (
          <div className="s-dropdown-item-value">
            {options.find((option) => option.value === innerValue)?.label}
          </div>
        )) ||
          (placeholder && (
            <div className="s-dropdown-placeholder">{placeholder}</div>
          ))}

        <Icon
          prefix="si"
          name={visible ? 'caret-up-fill' : 'caret-down-fill'}
          className="s-dropdown-item-icon"
        ></Icon>
      </div>
      <Popup placement="bottom" visible={visible}>
        <div className="s-dropdown-options" ref={optionsRef}>
          {options.map((option, index) => (
            <DropdownOption
              {...option}
              key={index}
              active={option.value === innerValue}
              onClick={() => handleOptionClick(option)}
            ></DropdownOption>
          ))}
        </div>
      </Popup>
    </>
  )
}

export default DropdownItem
