import { CSSProperties, FC, ReactNode, useContext } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { RowContext } from './Row'

export interface ColProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  span?: number | 'auto' | 'none' | ''
  offset?: number | ''
  order?: number
}

export const Col: FC<ColProps> = (props) => {
  const {
    children,
    className,
    style,
    span = '',
    offset = '',
    order,
    ...restProps
  } = props

  const colClass = classNames(
    's-col',
    {
      ['s-col-' + span]: span,
      ['s-col-offset-' + offset]: offset,
    },
    className,
  )

  const context = useContext(RowContext)

  const colStyle = Object.assign(
    order != null
      ? {
          order,
        }
      : {},
    context && context.gutter
      ? {
          paddingLeft: context.gutter / 2 + 'px',
          paddingRight: context.gutter / 2 + 'px',
        }
      : null,
    style,
  )

  return (
    <div {...restProps} className={colClass} style={colStyle}>
      {children}
    </div>
  )
}

export default Col
