import {
  Children,
  cloneElement,
  ReactNode,
  useContext,
  useEffect,
  isValidElement,
  FC,
} from 'react'
import { CommonComponentProps } from '../../utils/types'

import { PopoutContext, PopoutChangeArgsContext } from './index'

export interface PopoutTargetProps extends CommonComponentProps {
  children?: ReactNode
  readOnly?: boolean
  value?: string | boolean
  clear?: string | boolean
  select?: boolean
  name?: string
  format?: (...args: any[]) => ReactNode
}

export const PopoutTarget: FC<PopoutTargetProps> = (props) => {
  const { children, readOnly, value, clear, select, format } = props

  const popoutContext = useContext(PopoutContext)
  const changeArgs = useContext(PopoutChangeArgsContext)

  const handleTargetClick = () => {
    if (!readOnly && select) {
      popoutContext.setVisible(true)
    }
  }

  useEffect(() => {
    try {
      const element = Children.only(children)
      if (isValidElement(element)) {
        const elementProps = {
          ...element.props,
          onClick: (...args: any[]) => {
            console.log('click')
            handleTargetClick()
            element.props.onClick?.(...args)
          },
        }
        if (value) {
          const valueName = value === true ? 'value' : value
          elementProps[valueName] =
            changeArgs[0] != null
              ? format
                ? format(...changeArgs)
                : changeArgs[0]
              : element.props[valueName] || ''
        }
        if (clear) {
          const clearName = clear === true ? 'onClear' : clear
          elementProps[clearName] = (...args: any[]) => {
            popoutContext.clear()

            element.props[clearName]?.(...args)
          }
        }
        popoutContext.setTarget(cloneElement(element, elementProps))
      } else {
        throw Error
      }
    } catch (err) {
      console.log(err)
      popoutContext.setTarget(children)
    }
  })

  return null
}

export default PopoutTarget
