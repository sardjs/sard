import {
  CSSProperties,
  ReactNode,
  RefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext,
  useEffect,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { UseMovableOptions, useMovable, BoundingRect } from './useMovable'
import { MovableAreaContext } from './Area'

export interface MovableViewProps
  extends CommonComponentProps,
    UseMovableOptions {
  rootRef?: RefObject<HTMLDivElement | null>
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface MovableViewRef {
  updateRect(rect?: BoundingRect): void
}

function translate3d(x: number, y: number, z: number) {
  return `translate3d(${x}px, ${y}px, ${z}px)`
}

export const MovableView = forwardRef<MovableViewRef, MovableViewProps>(
  (props, ref) => {
    const {
      rootRef,
      className,
      style,
      children,
      x,
      y,
      defaultX,
      defaultY,
      direction,
      inertia,
      inertiaDuration,
      inertiaTime,
      outOfBounds,
      inertiaMaxOverflow,
      damping,
      reboundDuration,
      lockDirection,
      onChange,
      onPanStart,
      onPanMove,
      onPanEnd,
      ...restProps
    } = props

    const viewRef = useRef<HTMLDivElement>(null)
    const areaRect = useContext(MovableAreaContext)

    const {
      updateRect,
      x: innerX,
      y: innerY,
      willChange,
    } = useMovable(areaRect, props)

    useEffect(() => {
      updateRect(viewRef.current?.getBoundingClientRect())
    }, [])

    useImperativeHandle(ref, () => ({
      updateRect,
    }))

    const areaClass = classNames('s-movable-view', className)
    const viewStyle = {
      transform: translate3d(innerX, innerY, 0),
      willChange,
      ...style,
    }

    return (
      <div {...restProps} ref={viewRef} className={areaClass} style={viewStyle}>
        {children}
      </div>
    )
  },
)

export default MovableView

/* 

# 优化
- 值改变时才触发 onChange

# 功能开发
[x] 超出边界
[x] 固定方向
[-] 动态尺寸
[ ] 相对单位（百分比）
[x] 惯性

# 问题
[x] 锁定方向阻止默认行为

*/
