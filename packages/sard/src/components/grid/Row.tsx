import classNames from 'classnames'
import { createContext, CSSProperties, FC, ReactNode } from 'react'
import { CommonComponentProps } from '../../utils/types'

const mapJustify = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
}
const mapAlign = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

export interface RowContext {
  gutter: number
}

export const RowContext = createContext<RowContext | null>(null)

export interface RowProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  gutter?: number
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Row: FC<RowProps> = (props) => {
  const {
    className,
    style,
    children,
    gutter = 0,
    justify,
    align,
    ...restProps
  } = props

  const rowStyle = Object.assign(
    {
      justifyContent: justify && mapJustify[justify],
      alignItems: align && mapAlign[align],
    },
    gutter
      ? {
          marginLeft: -gutter / 2 + 'px',
          marginRight: -gutter / 2 + 'px',
        }
      : null,
    style,
  )

  const rowClass = classNames('s-row', className)

  const context = {
    gutter,
  }

  return (
    <div {...restProps} className={rowClass} style={rowStyle}>
      <RowContext.Provider value={context}>{children}</RowContext.Provider>
    </div>
  )
}

export default Row
