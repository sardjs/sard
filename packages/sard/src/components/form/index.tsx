import { CSSProperties, ReactNode, FormEventHandler, FC } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { FormItem } from './Item'

export * from './Item'

export interface FormProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onSubmit?: (event: SubmitEvent) => void
}

export interface FormFC extends FC<FormProps> {
  Item: typeof FormItem
}

export const Form: FormFC = (props) => {
  const { className, style, children, onSubmit, ...restProps } = props

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event: any) => {
    event.preventDefault()
    onSubmit?.(event)
  }

  const formClass = classNames('s-form')

  return (
    <form {...restProps} className={formClass} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

Form.Item = FormItem

export default Form
