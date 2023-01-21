import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { Icon, IconProps } from '../icon'

export interface EmptyProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  icon?: ReactNode
  iconProps?: IconProps
  description?: ReactNode
}

export const Empty: FC<EmptyProps> = (props) => {
  const {
    className,
    children,
    icon,
    iconProps,
    description = '暂无数据',
    ...restProps
  } = props

  const emptyClass = classNames('s-empty', className)

  return (
    <div {...restProps} className={emptyClass}>
      <div className="s-empty-icon">
        {icon ?? <Icon prefix="si" name="empty" {...iconProps}></Icon>}
      </div>
      {description && <div className="s-empty-description">{description}</div>}
      {children && <div className="s-empty-extra">{children}</div>}
    </div>
  )
}

export default Empty
