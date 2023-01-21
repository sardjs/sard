import { CSSProperties, ReactNode, Children, cloneElement, FC } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

import { StepsStep, StepsStepProps } from './Step'

export * from './Step'

export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'

export interface StepsProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  center?: boolean
  direction?: 'horizontal' | 'vertical'
  active?: number
  status?: StepsStatus
  lineColor?: string
  clickable?: boolean
  disabled?: boolean
  onChange?: (active: number) => void
}

export interface StepsFC extends FC<StepsProps> {
  Step: typeof StepsStep
}

export const Steps: StepsFC = (props) => {
  const {
    className,
    children,
    center = false,
    direction = 'horizontal',
    active = 0,
    status,
    lineColor,
    clickable,
    disabled = false,
    onChange,
    ...restProps
  } = props

  const stepsClass = classNames(
    's-steps',
    `s-steps-${direction}`,
    {
      's-steps-center': center,
      's-steps-clickable': clickable,
    },
    className,
  )

  return (
    <div {...restProps} className={stepsClass}>
      {Children.map(
        children as React.ReactElement,
        (item: React.ReactElement<StepsStepProps>, index) => {
          return cloneElement(item, {
            status:
              item.props.status ??
              (index < active
                ? 'finish'
                : index === active
                ? status ?? 'process'
                : 'wait'),
            lineColor: item.props.lineColor ?? lineColor,
            disabled: item.props.disabled ?? disabled,
          })
        },
      )}
    </div>
  )
}

Steps.Step = StepsStep

export default Steps
