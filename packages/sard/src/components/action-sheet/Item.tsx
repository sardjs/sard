import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface ActionSheetItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  label?: ReactNode
  disabled?: boolean
  color?: string
  onClick?: (props: ActionSheetItemProps) => any
}

export const ActionSheetItem: FC<ActionSheetItemProps> = (props) => {
  const {
    className,
    style,
    children,
    title,
    label,
    color,
    disabled,
    onClick,
    ...restProps
  } = props

  const actionSheetItemClass = classNames(
    's-action-sheet-item',
    {
      's-action-sheet-item-disabled': disabled,
    },
    className,
  )
  const actionSheetItemStyle = {
    color,
    ...style,
  }

  return (
    <div
      {...restProps}
      className={actionSheetItemClass}
      style={actionSheetItemStyle}
      onClick={() => onClick?.(props)}
    >
      {children || (
        <>
          {title && <div className="s-action-sheet-item-title">{title}</div>}
          {label && <div className="s-action-sheet-item-label">{label}</div>}
        </>
      )}
    </div>
  )
}

export default ActionSheetItem
