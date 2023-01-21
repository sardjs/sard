import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface CellGroupProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  label?: ReactNode
  wide?: boolean
  flush?: boolean
}

export const CellGroup: FC<CellGroupProps> = (props) => {
  const {
    className = '',
    children,
    title,
    label,
    wide,
    flush,
    ...restProps
  } = props

  const cellGroupClass = classNames(
    's-cell-group',
    {
      's-cell-group-wide': wide,
      's-cell-group-flush': flush,
    },
    className,
  )

  return (
    <div {...restProps} className={cellGroupClass}>
      {title && (
        <div className="s-cell-group-header">
          <div className="s-cell-group-title">{title}</div>
        </div>
      )}
      <div className="s-cell-group-body">{children}</div>
      {label && (
        <div className="s-cell-group-footer">
          <div className="s-cell-group-label">{label}</div>
        </div>
      )}
    </div>
  )
}

export default CellGroup
