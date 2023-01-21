import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface FormItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  label?: ReactNode
  labelWidth?: number | string
  error?: ReactNode
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { className, style, children, label, labelWidth, error, ...restProps } =
    props

  const formItemClass = classNames('s-form-item')

  const labelStyle = {
    width: labelWidth,
  }

  return (
    <div {...restProps} className={formItemClass}>
      <div className="s-form-item-label" style={labelStyle}>
        {label}
      </div>
      <div className="s-form-item-content">
        {children}
        {error && <div className="s-form-item-error">{error}</div>}
      </div>
    </div>
  )
}

export default FormItem
