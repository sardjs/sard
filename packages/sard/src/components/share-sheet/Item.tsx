import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { Icon, IconProps } from '../icon'

export interface ShareSheetItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  label?: ReactNode
  color?: string
  icon?: IconProps
  onClick?: (props: ShareSheetItemProps) => any
}

export const ShareSheetItem: FC<ShareSheetItemProps> = (props) => {
  const {
    className,
    style,
    children,
    title,
    label,
    color,
    icon,
    onClick,
    ...restProps
  } = props

  const shareSheetItemClass = classNames('s-share-sheet-item', className)
  const shareSheetItemStyle = {
    color,
    ...style,
  }

  return (
    <div
      {...restProps}
      className={shareSheetItemClass}
      style={shareSheetItemStyle}
      onClick={() => onClick?.(props)}
    >
      {children || (
        <>
          <div className="s-share-sheet-item-icon">
            <Icon type="circle" size="24px" frameSize="48px" {...icon}></Icon>
          </div>
          {title && <div className="s-share-sheet-item-title">{title}</div>}
          {label && <div className="s-share-sheet-item-label">{label}</div>}
        </>
      )}
    </div>
  )
}

export default ShareSheetItem
