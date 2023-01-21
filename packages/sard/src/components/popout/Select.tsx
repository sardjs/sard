import { Children, cloneElement, FC, ReactElement, useContext } from 'react'
import { CommonComponentProps } from '../../utils/types'
import { PopoutContext } from './index'

export interface PopoutSelectProps extends CommonComponentProps {
  children: ReactElement
}

export const PopoutSelect: FC<PopoutSelectProps> = (props) => {
  const { children } = props

  const popoutContext = useContext(PopoutContext)

  const element = Children.only(children)
  return cloneElement(element, {
    ...element.props,
    onClick: (...args: any[]) => {
      popoutContext.setVisible(true)
      element.props.onClick?.(...args)
    },
  })
}

export default PopoutSelect
