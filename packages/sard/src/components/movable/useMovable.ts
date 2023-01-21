import { RefObject, useEffect, useRef, useState } from 'react'
import { useStrike, useEvent } from '../../use'
import {
  animate,
  getRectDampingValue,
  getInBoundValue,
  getOverflowRangeInArea,
  minmax,
} from '../../utils'

import { PAN_END, PAN_MOVE, PAN_START, StrikePanEvent } from '../../strike'

export interface UseMovableOptions {
  x?: number
  y?: number
  defaultX?: number
  defaultY?: number
  direction?: 'all' | 'vertical' | 'horizontal' | 'none'
  inertia?: boolean
  inertiaDuration?: number
  inertiaTime?: number
  outOfBounds?: boolean
  inertiaMaxOverflow?: number
  damping?: number
  reboundDuration?: number
  touchable?: boolean
  lockDirection?: boolean
  onChange?: (x: number, y: number) => void
  onPanStart?: () => void
  onPanMove?: () => void
  onPanEnd?: () => void
  onMoveEnd?: (x: number, y: number) => void
}

type EmptyFunc = () => void

type SideType = 'width' | 'height'

const DIR_HORIZONTAL = 'horizontal'
const DIR_VERTICAL = 'vertical'
const DIR_ALL = 'all'

export interface BoundingRect {
  x: number
  y: number
  width: number
  height: number
}

export function useMovable(
  areaBoundingRect: BoundingRect,
  options: UseMovableOptions = {},
) {
  const {
    x: propX,
    y: propY,
    defaultX,
    defaultY,
    direction = DIR_ALL,
    inertia = false,
    inertiaDuration = 300,
    inertiaTime = 300,
    inertiaMaxOverflow = 50,
    outOfBounds = false,
    damping = 5,
    reboundDuration = 200,
    touchable = true,
    lockDirection = false,
    onChange,
    onPanStart,
    onPanMove,
    onPanEnd,
    onMoveEnd,
  } = options

  const [innerX, setInnerX] = useState(defaultX || propX || 0)
  const [innerY, setInnerY] = useState(defaultY || propY || 0)
  const immediateX = useRef(innerX)
  const immediateY = useRef(innerY)
  const setInnerXAgent = (value: number) => {
    immediateX.current = value
    setInnerX(value)
  }
  const setInnerYAgent = (value: number) => {
    immediateY.current = value
    setInnerY(value)
  }

  const [willChange, setWillChange] = useState('')

  // 受控
  useEffect(() => {
    if (propX != null) {
      setInnerXAgent(propX)
    }
    if (propY != null) {
      setInnerYAgent(propY)
    }
  }, [propX, propY])

  const downCoord = useRef({
    x: 0,
    y: 0,
  })

  const stopReboundAnimate = useRef<{
    x: null | EmptyFunc
    y: null | EmptyFunc
  }>({
    x: null,
    y: null,
  })

  const stopInertiaAnimate = useRef<{
    x: null | EmptyFunc
    y: null | EmptyFunc
  }>({
    x: null,
    y: null,
  })

  const viewRect = useRef<BoundingRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const updateRect = useEvent((rect: BoundingRect) => {
    Object.assign(viewRect.current, {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    })
  })

  const stopAnimate = useEvent(() => {
    if (
      stopReboundAnimate.current.x ||
      stopReboundAnimate.current.y ||
      stopInertiaAnimate.current.x ||
      stopInertiaAnimate.current.y
    ) {
      stopReboundAnimate.current.x?.()
      stopReboundAnimate.current.y?.()
      stopInertiaAnimate.current.x?.()
      stopInertiaAnimate.current.y?.()
      stopReboundAnimate.current.x = null
      stopReboundAnimate.current.y = null
      stopInertiaAnimate.current.x = null
      stopInertiaAnimate.current.y = null
      onMoveEnd?.(immediateX.current, immediateY.current)
    }
  })

  const handlePanStart = useEvent(() => {
    onPanStart?.()
    stopAnimate()

    function getDownCoord(side: SideType, curr: number) {
      return getRectDampingValue(
        curr,
        areaBoundingRect[side],
        viewRect.current[side],
        outOfBounds ? damping : 0,
      )
    }

    downCoord.current.x = getDownCoord('width', innerX)
    downCoord.current.y = getDownCoord('height', innerY)

    setWillChange('transform')
  })

  const handlePanMove = useEvent((event: StrikePanEvent) => {
    onPanMove?.()
    let x = event.deltaX + downCoord.current.x
    let y = event.deltaY + downCoord.current.y

    function getCurrCoord(side: SideType, curr: number) {
      return getRectDampingValue(
        curr,
        areaBoundingRect[side],
        viewRect.current[side],
        outOfBounds ? 1 / damping || 0 : 0,
      )
    }

    x =
      direction === DIR_ALL || direction === DIR_HORIZONTAL
        ? getCurrCoord('width', x)
        : immediateX.current
    y =
      direction === DIR_ALL || direction === DIR_VERTICAL
        ? getCurrCoord('height', y)
        : immediateY.current

    // 非受控
    if (propX == null) {
      setInnerXAgent(x)
    }
    if (propY == null) {
      setInnerYAgent(y)
    }
    onChange?.(x, y)
  })

  const setReboundAnimate = (axis: 'x' | 'y', from: number, to: number) => {
    stopReboundAnimate.current[axis] = animate({
      from,
      to,
      duration: reboundDuration,
      step(value) {
        if (axis === 'x') {
          if (propX == null) {
            setInnerXAgent(value)
          }
          onChange?.(value, immediateY.current)
        }
        if (axis === 'y') {
          if (propY == null) {
            setInnerYAgent(value)
          }
          onChange?.(immediateX.current, value)
        }
      },
      finish() {
        onMoveEnd?.(immediateX.current, immediateY.current)
        stopReboundAnimate.current[axis] = null
      },
    })
  }

  const handlePanEnd = useEvent((event: StrikePanEvent) => {
    onPanEnd?.()

    const reboundAnimate = (side: SideType, axis: 'x' | 'y', coord: number) => {
      const to = getInBoundValue(
        coord,
        areaBoundingRect[side],
        viewRect.current[side],
      )
      const from = coord

      if (from !== to) {
        setReboundAnimate(axis, from, to)
      } else {
        // 惯性
        if (inertia) {
          const speed = minmax(event[axis === 'x' ? 'speedX' : 'speedY'], -8, 8)
          const to = from + speed * inertiaTime
          const overflow = inertiaMaxOverflow * damping
          const overflowRange = getOverflowRangeInArea(
            overflow,
            areaBoundingRect[side],
            viewRect.current[side],
          )
          stopInertiaAnimate.current[axis] = animate({
            from,
            to: minmax(to, ...overflowRange),
            duration: inertiaDuration,
            step(value) {
              const dampedValue = getRectDampingValue(
                value,
                areaBoundingRect[side],
                viewRect.current[side],
                outOfBounds ? 1 / damping || 0 : 0,
              )
              if (axis === 'x') {
                if (propX == null) {
                  setInnerXAgent(dampedValue)
                }
                onChange?.(dampedValue, immediateY.current)
              }
              if (axis === 'y') {
                if (propY == null) {
                  setInnerYAgent(dampedValue)
                }
                onChange?.(immediateX.current, dampedValue)
              }
            },
            finish() {
              stopInertiaAnimate.current[axis] = null

              const from =
                axis === 'x' ? immediateX.current : immediateY.current
              const to = getInBoundValue(
                from,
                areaBoundingRect[side],
                viewRect.current[side],
              )

              if (from !== to) {
                setReboundAnimate(axis, from, to)
              } else {
                onMoveEnd?.(immediateX.current, immediateY.current)
              }
            },
          })
        }
      }
    }

    if (direction === DIR_ALL || direction === DIR_HORIZONTAL) {
      reboundAnimate('width', 'x', immediateX.current)
    }
    if (direction === DIR_ALL || direction === DIR_VERTICAL) {
      reboundAnimate('height', 'y', immediateY.current)
    }
    if (!direction) {
      onMoveEnd?.(immediateX.current, immediateY.current)
    }

    setWillChange('auto')
  })

  const binding = useStrike(
    (strike) => {
      strike.on(PAN_START, handlePanStart)
      strike.on(PAN_MOVE, handlePanMove)
      strike.on(PAN_END, handlePanEnd)
    },
    {
      pan: true,
      direction,
      lockDirection,
    },
    touchable,
  )

  useEffect(() => stopAnimate, [])
  return {
    updateRect,
    willChange,
    binding,
    x: innerX,
    y: innerY,
  }
}

export default useMovable
