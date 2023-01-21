import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CellGroup } from './Group'
import Icon from '../icon'
import { CommonComponentProps } from '../../utils/types'

export * from './Group'

export interface CellProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  header?: ReactNode
  title?: ReactNode
  label?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  value?: ReactNode
  isLink?: boolean
  fullDisplay?: '' | 'body' | 'footer'
  icon?: ReactNode
  onClick?: () => any
}

export interface CellFC extends FC<CellProps> {
  Group: typeof CellGroup
}

export const Cell: CellFC = (props) => {
  const {
    className = '',
    children,
    header,
    title,
    label,
    body,
    footer,
    value,
    isLink = false,
    fullDisplay = 'body',
    icon,
    onClick,
    ...restProps
  } = props

  const cellClass = classNames(
    's-cell',
    {
      's-cell-is-link': isLink,
    },
    className,
  )

  const bodyClass = classNames('s-cell-body', {
    's-cell-body-full-display': fullDisplay === 'body',
  })
  const footerClass = classNames('s-cell-footer', {
    's-cell-footer-full-display': fullDisplay === 'footer',
  })

  return (
    <div {...restProps} className={cellClass} onClick={onClick}>
      {!children && header && <div className="s-cell-header">{header}</div>}
      <div className="s-cell-content">
        {children ?? (
          <>
            {body || (
              <div className={bodyClass}>
                {title && <div className="s-cell-title">{title}</div>}
                {label && <div className="s-cell-label">{label}</div>}
              </div>
            )}

            {footer || (
              <div className={footerClass}>
                <>
                  {value && <div className="s-cell-value">{value}</div>}
                  {(isLink || icon) && (
                    <div className="s-cell-icon">
                      {icon ?? <Icon prefix="si" name="right"></Icon>}
                    </div>
                  )}
                </>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

Cell.Group = CellGroup

export default Cell
