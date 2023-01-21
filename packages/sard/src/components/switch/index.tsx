import { CSSProperties, FC } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import Loading from '../loading'
import { CommonComponentProps } from '../../utils/types'

export interface SwitchProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  size?: string
  checkedColor?: string
  uncheckedColor?: string
  checkedValue?: any
  uncheckedValue?: any
  loading?: boolean
  onChange?: (check: any, value: any) => any
  onClick?: () => any
}

export const Switch: FC<SwitchProps> = (props) => {
  const {
    className,
    style,
    checked,
    defaultChecked,
    disabled = false,
    size,
    checkedColor,
    uncheckedColor,
    checkedValue = true,
    uncheckedValue = false,
    loading = false,
    onChange,
    onClick,
    ...restProps
  } = props

  const [innerChecked, setInnerChecked] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultChecked',
    valuePropName: 'checked',
    defaultValue: false,
  })

  const onSwitchClick = () => {
    if (disabled || loading) {
      return
    }

    setInnerChecked(
      !innerChecked,
      !innerChecked ? checkedValue : uncheckedValue,
    )

    onClick?.()
  }

  const switchClass = classNames(
    's-switch',
    {
      's-switch-checked': innerChecked,
      's-switch-disabled': disabled,
      's-switch-is-loading': loading,
    },
    className,
  )

  const switchStyle = {
    backgroundColor: innerChecked ? checkedColor : uncheckedColor,
    fontSize: size,
    ...style,
  }

  return (
    <div
      {...restProps}
      className={switchClass}
      style={switchStyle}
      onClick={onSwitchClick}
    >
      <div className="s-switch-thumb">
        {loading && <Loading className="s-switch-loading" />}
      </div>
    </div>
  )
}

export default Switch
