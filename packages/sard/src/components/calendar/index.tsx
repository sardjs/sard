import {
  CSSProperties,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { useEvent } from '../../use'
import { getDaysInMonth, getWeekOnFirstDay, EasyDate } from '../../utils'

type DateString = string

interface CalendarBaseProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  min?: Date | DateString
  max?: Date | DateString
  title?: ReactNode
  disabledDate?: (date: Date, datestring: string) => boolean
}

export interface CalendarSingleProps extends CalendarBaseProps {
  type?: 'single'
  value?: Date | DateString
  defaultValue?: Date | DateString
  onChange?: (value: string) => void
}

export interface CalendarMultipleProps extends CalendarBaseProps {
  type?: 'multiple'
  maxDays?: number
  value?: (Date | DateString)[]
  defaultValue?: (Date | DateString)[]
  onChange?: (value: string[]) => void
}

export interface CalendarRangeProps extends CalendarBaseProps {
  type?: 'range'
  maxDays?: number
  value?: [Date | DateString, Date | DateString]
  defaultValue?: [Date | DateString, Date | DateString]
  onChange?: (value: [string, string]) => void
}

export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps

const weeks = ['日', '一', '二', '三', '四', '五', '六']

const getMinDate = () => {
  return new EasyDate(new Date())
}

const getMaxDate = () => {
  const date = new Date()
  date.setMonth(date.getMonth() + 6)
  return new EasyDate(date)
}

export interface CalendarImperative {
  scrollToDate(dateString: string): void
}

export const Calendar = forwardRef<CalendarImperative, CalendarProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,
      min,
      max,
      title,
      disabledDate,
      type = 'single',
      value,
      defaultValue,
      onChange,
      ...restProps
    } = props

    const dateElements = useRef<{ [p: string]: any }>({})

    const minDate = useMemo(() => {
      return min ? new EasyDate(min) : getMinDate()
    }, [min])

    const maxDate = useMemo(() => {
      const maxDate = max ? new EasyDate(max) : getMaxDate()
      return maxDate.lt(minDate) ? minDate.clone() : maxDate
    }, [max])

    const minMonthCount = useMemo(() => {
      return minDate.year * 12 + minDate.month
    }, [min])

    const maxMonthCount = useMemo(() => {
      return maxDate.year * 12 + maxDate.month
    }, [max])

    const getYearMonthByIndex = (index: number): [number, number] => {
      const monthCount = minMonthCount + index
      return [Math.ceil(monthCount / 12 - 1), monthCount % 12 || 12]
    }

    const toLegalValue = (value: string | Date | (string | Date)[]) => {
      return (Array.isArray(value) ? value : [value]).map(
        (date) => new EasyDate(date),
      )
    }

    const [innerValue, setInnerValue] = useState<EasyDate[]>(() => {
      const val = value ?? defaultValue
      return toLegalValue(val == null ? [] : val)
    })

    // 受控
    useEffect(() => {
      if (value != null) {
        setInnerValue(toLegalValue(value))
      }
    }, [value])

    const handleDayClick = (date: EasyDate, disabled: boolean) => {
      if (disabled) {
        return
      }
      if (type === 'single') {
        // 非受控
        if (value == null) {
          setInnerValue([date])
        }
        onChange?.(date.toString() as any)
      } else if (type === 'multiple') {
        const val = innerValue.some((d) => d.eq(date))
          ? innerValue.filter((d) => !d.eq(date))
          : innerValue.concat(date)

        // 非受控
        if (value == null) {
          setInnerValue(val)
        }
        onChange?.(val.map((date) => date.toString()) as any)
      } else if (type === 'range') {
        const val =
          innerValue.length === 1
            ? innerValue
                .concat(date)
                .sort((a, b) => a.toNumber() - b.toNumber())
            : [date]

        // 非受控
        if (value == null) {
          setInnerValue(val)
        }
        if (val.length === 2) {
          onChange?.(val.map((date) => date.toString()) as any)
        }
      }
    }

    const calendarClass = classNames('s-calendar', className)

    const scrollToDate = useEvent((dateString: string) => {
      const el = dateElements.current[dateString] as Element

      if (el) {
        setTimeout(() => {
          el.scrollIntoView(true)
        })
      }
    })

    useImperativeHandle(ref, () => ({
      scrollToDate,
    }))

    const renderMonth = ([year, month]: [number, number]) => {
      const days = getDaysInMonth(year, month)
      let nextDate: EasyDate | undefined
      let nextSelected: boolean | undefined

      return (
        <div key={year * 100 + month} className="s-calendar-month">
          <div className="s-calendar-month-title">
            {year}年{month}月
          </div>
          <div className="s-calendar-month-body">
            {Array(days)
              .fill(0)
              .map((_, i) => {
                const date = nextDate ?? new EasyDate(year, month, i + 1)
                const selected =
                  nextSelected ?? innerValue.some((d) => d.eq(date))
                if (i < days - 1) {
                  nextDate = new EasyDate(year, month, i + 2)
                  nextSelected = innerValue.some((d) =>
                    d.eq(nextDate as EasyDate),
                  )
                } else {
                  nextDate = nextSelected = void 0
                }

                let disabled = false

                if (disabledDate) {
                  disabled = disabledDate(date.toDate(), date.toString())
                }

                if (date.lt(minDate) || date.gt(maxDate)) {
                  disabled = true
                }

                const dateString = date.toString()

                return (
                  <div
                    key={i}
                    ref={(el) => (dateElements.current[dateString] = el)}
                    className={classNames('s-calendar-day', {
                      's-calendar-day-selected': selected,
                      's-calendar-day-next-selected': selected && nextSelected,
                      's-calendar-day-start':
                        type === 'range' &&
                        innerValue[0] &&
                        innerValue[0].eq(date),
                      's-calendar-day-end':
                        type === 'range' &&
                        innerValue[1] &&
                        innerValue[1].eq(date),
                      's-calendar-day-middle':
                        type === 'range' &&
                        innerValue.length === 2 &&
                        date.gt(innerValue[0]) &&
                        date.lt(innerValue[1]),
                      's-calendar-day-disabled': disabled,
                    })}
                    style={{
                      gridColumnStart:
                        i === 0 ? getWeekOnFirstDay(year, month) + 1 : '',
                    }}
                    onClick={() => handleDayClick(date, disabled)}
                  >
                    {i + 1}
                  </div>
                )
              })}
            <div className="s-calendar-month-mark">{month}</div>
          </div>
        </div>
      )
    }

    return (
      <div {...restProps} className={calendarClass}>
        <div className="s-calendar-header">
          {title && <div className="s-calendar-title">{title}</div>}
          <div className="s-calendar-week">
            {weeks.map((item) => (
              <div key={item} className="s-calendar-week-item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="s-calendar-body">
          {Array(maxMonthCount - minMonthCount + 1)
            .fill(0)
            .map((_, i) => renderMonth(getYearMonthByIndex(i)))}
        </div>
        <div className="s-calendar-footer"></div>
      </div>
    )
  },
)

export default Calendar
