import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { Transition } from '../transition/index'
import { useEvent, useSelectorId } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { getBoundingClientRect } from '../../utils/dom'

export interface CollapseProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  visible?: boolean
  timeout?: number
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

export const Collapse: FC<CollapseProps> = (props) => {
  const {
    className,
    style,
    children,
    visible,
    timeout = 500,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const [show, setShow] = useState(visible)
  const [collapsing, setCollapsing] = useState(false)
  const [height, setHeight] = useState<number | ''>('')

  const collapseId = useSelectorId()

  const timer = useRef(0)

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleEnter = useEvent(() => {
    getBoundingClientRect(collapseId, (rect) => {
      setHeight(0)
      setShow(true)
      setCollapsing(true)

      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setHeight(rect.height)
      }, 100)
    })
    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    setHeight('')
    setCollapsing(false)
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    getBoundingClientRect(collapseId, (rect) => {
      setHeight(rect.height)
      setCollapsing(true)

      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setHeight(0)
      }, 100)
    })
    onExit?.()
  })

  const handleExiting = useEvent(() => {
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    setHeight('')
    setShow(false)
    setCollapsing(false)
    onExited?.()
  })

  const collapseClass = classNames(
    's-collapse',
    {
      's-collapse-show': show,
      's-collapse-collapsing': collapsing,
    },
    className,
  )

  const collapseStyle = {
    ...style,
    height,
    transitionDuration: timeout + 'ms',
  }

  return (
    <Transition
      {...restProps}
      timeout={timeout}
      in={visible}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      <div className={collapseClass} style={collapseStyle}>
        <div className="s-colllapse-content" id={collapseId}>
          {children}
        </div>
      </div>
    </Transition>
  )
}

export default Collapse
