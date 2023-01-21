import { CSSProperties, useState, useEffect, FC } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { Icon } from '../icon'

export interface InputProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  value?: string | number
  defaultValue?: string | number
  type?:
    | 'text'
    | 'number'
    | 'idcard'
    | 'digit'
    | 'tel'
    | 'password'
    | 'textarea'
  placeholder?: string
  placeholderStyle?: string
  placeholderClass?: string
  disabled?: boolean
  readOnly?: boolean
  maxlength?: number
  cursorSpacing?: number
  focus?: boolean
  autoHeight?: boolean
  fixed?: boolean
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done' | ''
  confirmHold?: boolean
  showConfirmBar?: boolean
  cursor?: number
  selectionStart?: number
  selectionEnd?: number
  adjustPosition?: boolean
  holdKeyboard?: boolean
  autoBlur?: boolean
  border?: boolean
  flush?: boolean
  prepend?: any
  append?: any
  rows?: number
  clearable?: boolean
  clear?: any
  onClear?: () => void
  onChange?: (value: string) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
  onClick?: (event: any) => void
}

export const Input: FC<InputProps> = (props) => {
  const {
    className,
    value,
    defaultValue,
    type = 'text',
    placeholder = '',
    disabled = false,
    readOnly = false,
    border = true,
    flush,
    prepend,
    append,
    rows,
    clearable,
    clear,
    onClear,
    onChange,
    onFocus,
    onBlur,
    onClick,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControlledValue<string | number>(
    props,
    {
      defaultValue: '',
    },
  )

  const [focused, setFocused] = useState(false)

  const handleFocus = (event: any) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: any) => {
    setFocused(false)
    onBlur?.(event)
  }

  const handleClear = () => {
    setInnerValue('')
    onClear?.()
  }

  const handleChange = (event: any) => {
    setInnerValue(event.target.value)
  }

  const inputClass = classNames(
    's-input',
    {
      's-input-flush': flush,
      's-input-no-border': !border,
      's-input-disabled': disabled,
      's-input-readonly': readOnly,
      's-input-focused': focused,
    },
    className,
  )

  const controlProps = {
    className: 's-input-control',
    autoComplete: 'off',
    value: innerValue,
    placeholder,
    disabled,
    readOnly,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick,
  }

  return (
    <div {...restProps} className={inputClass}>
      {prepend && <div className="s-input-prepend">{prepend}</div>}
      {type === 'textarea' ? (
        <textarea {...controlProps} rows={rows} />
      ) : (
        <input {...controlProps} type={type} />
      )}
      {append && <div className="s-input-append">{append}</div>}
      {clearable && innerValue && (
        <div className="s-input-clear" onClick={handleClear}>
          {clear || (
            <Icon
              prefix="si"
              name="x-circle-fill"
              className="s-input-clear-icon"
            ></Icon>
          )}
        </div>
      )}
    </div>
  )
}

export default Input
