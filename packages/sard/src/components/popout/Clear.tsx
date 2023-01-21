import {
  Children,
  cloneElement,
  ReactNode,
  useContext,
  isValidElement,
  FC,
} from 'react'
import { CommonComponentProps } from '../../utils/types'
import { PopoutContext } from './index'

export interface PopoutClearProps extends CommonComponentProps {
  children?: ReactNode
}

export const PopoutClear: FC<PopoutClearProps> = (props) => {
  const { children } = props

  const popoutContext = useContext(PopoutContext)

  try {
    const element = Children.only(children)
    if (isValidElement(element)) {
      return cloneElement(element, {
        ...element.props,
        onClick: (...args: any[]) => {
          popoutContext.clear()
          element.props.onClick?.(...args)
        },
      })
    }
    throw Error
  } catch {
    return null
  }
}

export default PopoutClear
