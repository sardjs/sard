import { CSSProperties, FC, ReactNode } from 'react'
import { CommonComponentProps } from '../../utils/types'

export interface TemplateProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export const Template: FC<TemplateProps> = (props) => {
  const { ...restProps } = props

  return <div {...restProps}></div>
}

export default Template
