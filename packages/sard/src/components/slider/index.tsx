import {
  useState,
  useRef,
  CSSProperties,
  ReactNode,
  useMemo,
  useEffect,
  SyntheticEvent,
  FC,
} from 'react'
import classNames from 'classnames'
import { useStrike, UseStrikeConfig, useEvent, useSelectorId } from '../../use'
import { minmax, mround } from '../../utils'
import { PAN_END, PAN_MOVE, PAN_START } from '../../strike'
import { CommonComponentProps } from '../../utils/types'
import { getBoundingClientRect } from '../../utils/dom'

type RangeValue = [number, number]

export interface SliderBaseProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  min?: number
  max?: number
  step?: number
  vertical?: boolean
  disabled?: boolean
  pieceColor?: string
  trackColor?: string
  trackSize?: string
  thumbColor?: string
  thumbSize?: string
  start?: (value: number) => ReactNode
  end?: (value: number) => ReactNode
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false
  value?: number
  defaultValue?: number
  onAfterChange?: (value: number) => void
  onChange?: (value: number) => void
}

export interface SliderRangeProps extends SliderBaseProps {
  range?: true
  value?: RangeValue
  defaultValue?: RangeValue
  onAfterChange?: (value: RangeValue) => void
  onChange?: (value: RangeValue) => void
}

export type SliderProps = SliderSingleProps | SliderRangeProps

const VERTICAL = 'vertical'
const HORIZONTAL = 'horizontal'

export const Slider: FC<SliderProps> = (props) => {
  const {
    className,
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    vertical = false,
    disabled = false,
    pieceColor = '',
    trackColor = '',
    trackSize = '',
    thumbColor = '',
    thumbSize = '',
    start,
    end,
    onAfterChange,
    onChange,
    ...restProps
  } = props

  const [isDown, setIsDown] = useState(false)
  const trackId = useSelectorId()
  const trackSizeRef = useRef(0)
  const downCoord = useRef(0)
  const downRatio = useRef(0)
  const oldRatio = useRef(0)
  const isNearStart = useRef(false)

  const getInitValue = (index: number) => {
    return () => {
      const val = range
        ? value ?? defaultValue ?? [min, min]
        : [min, value ?? defaultValue ?? min]
      return minmax(mround((val as RangeValue)[index], step), min, max)
    }
  }
  const [startValue, setStartValue] = useState(getInitValue(0))
  const [endValue, setEndValue] = useState(getInitValue(1))

  const downValue = useRef({
    start: startValue,
    end: endValue,
  })
  const oldValue = useRef({
    start: startValue,
    end: endValue,
  })
  const currRatio = useRef({
    start: 0,
    end: 0,
  })

  // 受控
  useEffect(() => {
    if (value == null) return
    let [startValue, endValue] = (range ? value : [min, value]) as RangeValue
    startValue = minmax(mround(startValue, step), min, max)
    endValue = minmax(mround(endValue, step), min, max)
    Object.assign(oldValue.current, {
      start: startValue,
      end: endValue,
    })
    setStartValue(startValue)
    setEndValue(endValue)
  }, [value, range, min, max])

  const [startRatio, endRatio] = useMemo(() => {
    const total = max - min
    const startRatio = (startValue - min) / total
    const endRatio = (endValue - min) / total
    Object.assign(currRatio.current, {
      start: startRatio,
      end: endRatio,
    })
    return [startRatio, endRatio]
  }, [startValue, endValue, min, max])

  const handlePanStart = useEvent(({ x, y }) => {
    if (disabled) return
    Object.assign(downValue.current, oldValue.current)
    getBoundingClientRect(trackId, (rect) => {
      const size = (trackSizeRef.current = vertical ? rect.height : rect.width)
      const rectCoord = vertical ? rect.top : rect.left
      const clientCoord = (downCoord.current = vertical ? y : x)
      const { start: startRatio, end: endRatio } = currRatio.current
      const offset = clientCoord - rectCoord
      if (range) {
        const startDist = Math.abs(offset - startRatio * size)
        const endDist = Math.abs(offset - endRatio * size)
        isNearStart.current = startDist < endDist
      }
      downRatio.current = offset / size
      oldRatio.current = isNearStart.current ? startRatio : endRatio
      setIsDown(true)
    })
  })

  const handleRatio = (ratio: number) => {
    ratio = minmax(mround(ratio, step / (max - min)), 0, 1)
    let { start: startRatio, end: endRatio } = currRatio.current

    if (range) {
      if (isNearStart.current) {
        if (ratio >= endRatio) {
          startRatio = endRatio
          endRatio = ratio
          isNearStart.current = false
        } else {
          startRatio = ratio
        }
      } else {
        if (ratio < startRatio) {
          endRatio = startRatio
          startRatio = ratio
          isNearStart.current = true
        } else {
          endRatio = ratio
        }
      }
    } else {
      endRatio = ratio
    }

    const total = max - min
    const ratioToValue = (ratio: number) =>
      minmax(mround(ratio * total + min, step), min, max)
    const startValue = ratioToValue(startRatio)
    const endValue = ratioToValue(endRatio)

    if (
      oldValue.current.start !== startValue ||
      oldValue.current.end !== endValue
    ) {
      Object.assign(oldValue.current, {
        start: startValue,
        end: endValue,
      })
      // 非受控
      if (value == null) {
        setStartValue(startValue)
        setEndValue(endValue)
      }
      onChange?.(
        (range ? [startValue, endValue] : endValue) as RangeValue & number,
      )
    }
  }

  const handlePanMove = useEvent(({ x, y }) => {
    if (disabled) return

    const clientCoord = vertical ? y : x
    const ratio =
      (clientCoord - downCoord.current) / trackSizeRef.current +
      oldRatio.current
    handleRatio(ratio)
  })

  const handlePanEnd = useEvent(() => {
    if (disabled) return
    setIsDown(false)
    const { start: startValue, end: endValue } = downValue.current
    if (
      oldValue.current.start !== startValue ||
      oldValue.current.end !== endValue
    ) {
      onAfterChange?.(
        (range ? [startValue, endValue] : endValue) as RangeValue & number,
      )
    }
  })

  const strikeConfig = {
    pan: true,
    direction: vertical ? VERTICAL : HORIZONTAL,
    lockDirection: false,
  } as UseStrikeConfig

  const startThumbBinding = useStrike((strike) => {
    strike.on(PAN_START, handlePanStart)
    strike.on(PAN_MOVE, handlePanMove)
    strike.on(PAN_END, handlePanEnd)
  }, strikeConfig)

  const endThumbBinding = useStrike((strike) => {
    strike.on(PAN_START, handlePanStart)
    strike.on(PAN_MOVE, handlePanMove)
    strike.on(PAN_END, handlePanEnd)
  }, strikeConfig)

  const handleSliderClick = useEvent((event) => {
    if (disabled) return
    const { clientX, clientY } = event
    handlePanStart({
      x: clientX,
      y: clientY,
    })
    handleRatio(downRatio.current)
    handlePanEnd()
  })

  const trackStyle = {
    width: vertical ? trackSize : '',
    height: !vertical ? trackSize : '',
    backgroundColor: trackColor,
  }

  const startPercent = startRatio * 100 + '%'
  const endPercent = (endRatio - startRatio) * 100 + '%'

  const pieceStyle = {
    [vertical ? 'top' : 'left']: startPercent,
    [vertical ? 'height' : 'width']: endPercent,
    backgroundColor: pieceColor,
  }

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    backgroundColor: thumbColor,
  }

  const sliderClass = classNames(
    's-slider',
    {
      's-slider-is-down': isDown,
      's-slider-vertical': vertical,
      's-slider-disabled': disabled,
    },
    className,
  )

  const thumbElement = () => (
    <div className="s-slider-thumb" style={thumbStyle}></div>
  )
  const stopPropagation = (event: SyntheticEvent) => event.stopPropagation()

  return (
    <div {...restProps} className={sliderClass}>
      <div
        id={trackId}
        className="s-slider-track"
        style={trackStyle}
        onClick={handleSliderClick}
      >
        <div className="s-slider-track-piece" style={pieceStyle}>
          {range && (
            <div
              {...startThumbBinding}
              className="s-slider-thumb-container s-slider-thumb-container-start"
              onClick={stopPropagation}
            >
              {start ? start(startValue) : thumbElement()}
            </div>
          )}

          <div
            {...endThumbBinding}
            className="s-slider-thumb-container s-slider-thumb-container-end"
            onClick={stopPropagation}
          >
            {end ? end(endValue) : thumbElement()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider

/* 
# 功能
[x] change事件
[x] afterChangeHandler事件
[x] click 选择
[x] 受控和非受控
[x] 步长
[x] change 不初始触发
[x] 内部 value 分解为 start 和 end

# 问题
[ ] 第一个滑动滑动时，第二个滑块如处于中间位置则会小幅度左右滑动
*/
