import { CSSProperties, ReactNode, useRef, FC } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { Icon } from '../icon'
import { useEvent, useSelectorId, useStrike } from '../../use'
import { PAN_START, PAN_MOVE, TAP, StrikePanEvent } from '../../strike'
import { getBoundingClientRect } from '../../utils/dom'

export interface RateProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  value?: number
  defaultValue?: number
  allowHalf?: boolean
  allowClear?: boolean
  count?: number
  size?: number | string
  spacing?: number | string
  icon?: ReactNode
  voidIcon?: ReactNode
  color?: string
  voidColor?: string
  disabled?: boolean
  onChange?: (value: number) => void
}

export const Rate: FC<RateProps> = (props) => {
  const {
    className,
    style,
    children,
    value,
    defaultValue,
    allowHalf,
    allowClear = true,
    count = 5,
    size,
    spacing,
    icon,
    voidIcon,
    color,
    voidColor,
    disabled,
    onChange,
    ...restProps
  } = props

  const rateId = useSelectorId()

  const [innerValue, setInnerValue] = useControlledValue<number>(props, {
    defaultValue: 0,
  })

  const itemsBoundary = useRef<[number, number][]>([])

  const panStartLeft = useRef(0)

  const setValueByCurrent = (current: number) => {
    if (current === innerValue) {
      return
    }
    setInnerValue(current)
  }

  const handlePanstart = useEvent(() => {
    if (disabled) {
      return
    }
    getBoundingClientRect(rateId, (rect) => {
      panStartLeft.current = rect.left
    })
    itemsBoundary.current = []
    Array(count)
      .fill(0)
      .map((_, index) => {
        getBoundingClientRect(rateId + '_' + index, (rect) => {
          itemsBoundary.current[index] = [rect.left, rect.right]
        })
      })
  })

  const handlePanChange = ({ x }: StrikePanEvent) => {
    if (disabled) {
      return
    }
    const offsetX = x - panStartLeft.current
    const boundaries = itemsBoundary.current
    if (offsetX < 0) {
      setValueByCurrent(0)
      return
    }

    for (let i = boundaries.length - 1; i >= 0; i--) {
      const [left, right] = boundaries[i]
      if (x >= left) {
        setValueByCurrent(i + (allowHalf && x < (right + left) / 2 ? 0.5 : 1))
        return
      }
    }
  }

  const handlePanmove = useEvent((event: StrikePanEvent) => {
    handlePanChange(event)
  })

  const handleTap = useEvent((event: StrikePanEvent) => {
    handlePanChange(event)
  })

  const rateBinding = useStrike(
    (strike) => {
      strike.on(PAN_START, handlePanstart)
      strike.on(PAN_MOVE, handlePanmove)
      strike.on(TAP, handleTap)
    },
    {
      pan: true,
      direction: 'horizontal',
      lockDirection: true,
      tap: true,
    },
  )

  const rateClass = classNames(
    's-rate',
    {
      's-rate-disabled': disabled,
    },
    className,
  )

  const rateStyle = {
    fontSize: size,
    ...style,
  }

  return (
    <div
      {...restProps}
      className={rateClass}
      style={rateStyle}
      {...rateBinding}
      id={rateId}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => {
          const itemValue = index + 1
          const diff = itemValue - innerValue

          return (
            <div
              className="s-rate-item"
              key={itemValue}
              style={{
                marginLeft: itemValue !== 1 && spacing != null ? spacing : '',
              }}
              id={rateId + '_' + index}
            >
              <div className="s-rate-star-void" style={{ color: voidColor }}>
                {voidIcon ?? <Icon prefix="si" name="star"></Icon>}
              </div>
              {diff < 1 && (
                <div
                  className="s-rate-star"
                  style={{
                    width: diff > 0 ? (innerValue % 1) + 'em' : '',
                    color: color,
                  }}
                >
                  {icon ?? <Icon prefix="si" name="star-fill"></Icon>}
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default Rate
