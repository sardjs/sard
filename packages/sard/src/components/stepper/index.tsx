import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { minmax } from '../../utils'
import { PRESS_DOWN, PRESS_UP } from '../../strike'
import { Icon } from '../icon'
import { Input } from '../input'
import { useEvent, useStrike } from '../../use'

export interface StepperProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  inputWidth?: number | string
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  precision?: number
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  press?: boolean
  interval?: number
  onChange?: (value: number) => void
  onBlur?: () => void
  onFocus?: () => void
}

export const Stepper: FC<StepperProps> = (props) => {
  const {
    className,
    children,
    inputWidth,
    value,
    defaultValue,
    min = -Infinity,
    max = Infinity,
    step = 1,
    precision,
    placeholder,
    disabled,
    readOnly,
    press = true,
    interval = 150,
    onChange,
    onBlur,
    onFocus,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControlledValue<number>(props)

  const [inputValue, setInputValue] = useState(value ?? defaultValue ?? '')

  useEffect(() => {
    if (value != null) {
      setInputValue(value)
    }
  }, [value])

  const setValue = (val?: number | string) => {
    setInnerValue(val)
    setInputValue(val)
  }

  const adjustValue = useEvent((value: number) => {
    value = minmax(value, min, max)
    if (precision != null) {
      value = ~~(Math.pow(10, precision) * value) / Math.pow(10, precision)
    }
    return value
  })

  const setByStep = useEvent((delta: number) => {
    setValue(adjustValue((innerValue || 0) + step * delta))
  })

  const handleDecrease = () => {
    !disabled && !readOnly && setByStep(-1)
  }

  const handleIncrease = () => {
    !disabled && !readOnly && setByStep(1)
  }

  const decreaseTimer = useRef(0)
  const increaseTimer = useRef(0)

  useEffect(
    () => () => {
      clearInterval(decreaseTimer.current)
      clearInterval(increaseTimer.current)
    },
    [],
  )

  const handlePressDown = useEvent((delta: number) => {
    setByStep(delta)

    const timer = setInterval(() => {
      setByStep(delta)
    }, interval) as unknown as number

    if (delta > 0) {
      increaseTimer.current = timer
    } else {
      decreaseTimer.current = timer
    }
  })

  const handlePressUp = useEvent((delta: number) => {
    clearInterval(delta > 0 ? increaseTimer.current : decreaseTimer.current)
  })

  const decreaseBinding = useStrike(
    (strike) => {
      strike.on(PRESS_DOWN, () => handlePressDown(-1))
      strike.on(PRESS_UP, () => handlePressUp(-1))
    },
    {
      press: true,
    },
    press && !disabled && !readOnly,
  )

  const increaseBinding = useStrike(
    (strike) => {
      strike.on(PRESS_DOWN, () => handlePressDown(1))
      strike.on(PRESS_UP, () => handlePressUp(1))
    },
    {
      press: true,
    },
    press && !disabled && !readOnly,
  )

  const handleChange = (value: string) => {
    setInputValue(value)
  }
  const handleBlur = () => {
    setValue(
      inputValue === '' ? undefined : adjustValue(Number(inputValue) || 0),
    )
  }

  const StepperClass = classNames(
    's-stepper',
    {
      's-stepper-disabled': disabled,
      's-stepper-readonly': readOnly,
    },
    className,
  )

  const decreaseButtonClass = classNames(
    's-stepper-button s-stepper-decrease',
    {
      's-stepper-button-disabled': innerValue != null && innerValue <= min,
    },
  )
  const increaseButtonClass = classNames(
    's-stepper-button s-stepper-increase',
    {
      's-stepper-button-disabled': innerValue != null && innerValue >= max,
    },
  )

  return (
    <div {...restProps} className={StepperClass}>
      <div
        {...decreaseBinding}
        className={decreaseButtonClass}
        onClick={handleDecrease}
      >
        <Icon prefix="si" name="minus"></Icon>
      </div>
      <Input
        className="s-stepper-input"
        placeholder={placeholder}
        style={{ width: inputWidth }}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={readOnly}
      />
      <div
        {...increaseBinding}
        className={increaseButtonClass}
        onClick={handleIncrease}
      >
        <Icon prefix="si" name="plus"></Icon>
      </div>
    </div>
  )
}

export default Stepper
