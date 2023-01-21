import { ReactElement, Children, cloneElement, useContext, FC } from 'react'

import { PopoutContext } from './index'

export interface PopoutBridgeProps {
  children: ReactElement
}

export const PopoutBridge: FC<PopoutBridgeProps> = (props) => {
  const { children } = props

  const popoutContext = useContext(PopoutContext)

  try {
    const element = Children.only(children)
    return cloneElement(element, {
      ...element.props,
      onChange: (...args: any[]) => {
        popoutContext.setTmpChangeArgs(args)
        element.props.onChange?.(...args)
      },
    })
  } catch {
    return null
  }
}

export default PopoutBridge
