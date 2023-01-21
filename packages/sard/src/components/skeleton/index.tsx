import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface SkeletonProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  row?: number
  title?: boolean
  avatar?: boolean
  avatarSize?: number | string
  avatarShape?: 'round' | 'square'
  round?: boolean
  loading?: boolean
  animated?: boolean
}

export const Skeleton: FC<SkeletonProps> = (props: SkeletonProps) => {
  const {
    className,
    children,
    row = 3,
    title = false,
    avatar = false,
    avatarSize = 32,
    avatarShape = 'round',
    round = false,
    loading = true,
    animated = false,
    ...restProps
  } = props

  const skeletonClass = classNames('s-skeleton', className, {
    's-skeleton-round': round,
    's-skeleton-animated': animated,
  })

  return (
    <>
      {loading ? (
        <div {...restProps} className={skeletonClass}>
          {avatar && (
            <div
              className={classNames(
                's-skeleton-avatar',
                `s-skeleton-avatar-${avatarShape}`,
              )}
              style={{ width: avatarSize, height: avatarSize }}
            ></div>
          )}
          <div className="s-skeleton-content">
            {title && <div className="s-skeleton-title"></div>}
            {Array(row)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="s-skeleton-row"></div>
              ))}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Skeleton
