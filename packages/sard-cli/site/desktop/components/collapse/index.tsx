import { CSSProperties, FC, ReactNode, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Transition } from '../transition/index'
import { useEvent } from '../../use/useEvent'

export interface CollapseProps {
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

  const timer = useRef(0)

  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleEnter = useEvent(() => {
    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    elRef.current.classList.add('show')
    const height = elRef.current.offsetHeight
    elRef.current.style.height = '0px'
    elRef.current.offsetHeight
    elRef.current.style.height = height + 'px'
    elRef.current.classList.add('collapsing')
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    elRef.current.classList.remove('collapsing')
    elRef.current.style.height = ''
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    onExit?.()
  })

  const handleExiting = useEvent(() => {
    const height = elRef.current.offsetHeight
    elRef.current.style.height = height + 'px'
    elRef.current.offsetHeight
    elRef.current.style.height = '0px'
    elRef.current.classList.add('collapsing')
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    elRef.current.classList.remove('show', 'collapsing')
    elRef.current.style.height = ''
    onExited?.()
  })

  const collapseClass = classNames('doc-collapse', className)

  const collapseStyle = {
    ...style,
    transitionDuration: timeout + 'ms',
  }

  return (
    <Transition
      in={visible}
      timeout={timeout}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      <div
        {...restProps}
        className={collapseClass}
        style={collapseStyle}
        ref={elRef}
      >
        {children}
      </div>
    </Transition>
  )
}

export default Collapse
