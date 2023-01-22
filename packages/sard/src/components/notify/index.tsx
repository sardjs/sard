import {
  CSSProperties,
  ReactNode,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import classNames from 'classnames'
import { Popup, PopupProps } from '../popup'
import { useSetTimeout } from '../../use'

import { CommonComponentProps } from '../../utils/types'

import { show, info, success, warning, error, hide } from './imperative'
import { NotifyAgent } from './Agent'

export interface NotifyProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  message?: ReactNode
  duration?: number
  color?: string
  background?: string
  onTimeout?: () => void
  visible?: boolean
  onVisible?: (visible: boolean) => void
  popupProps?: PopupProps
}

export interface NotifyRef {
  clear: () => void
  reset: () => void
}

export interface NotifyFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<NotifyProps> & RefAttributes<NotifyRef>
  > {
  show: typeof show
  info: typeof info
  success: typeof success
  warning: typeof warning
  error: typeof error
  hide: typeof hide
  Agent: typeof NotifyAgent
}

export const Notify: NotifyFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    children,
    type = 'info',
    message,
    duration = 3000,
    color,
    background,
    onTimeout,
    visible = false,
    onVisible,
    popupProps = {},
    ...restProps
  } = props

  const {
    mask = false,
    placement = 'top',
    lockScroll = false,
    ...restPopupProps
  } = popupProps

  const { reset, clear } = useSetTimeout(() => {
    onTimeout?.()
    onVisible?.(false)
  }, duration)

  useEffect(() => {
    if (visible) {
      reset()
    } else {
      clear()
    }
  }, [visible])

  useEffect(() => {
    reset()
  }, [duration])

  useImperativeHandle(ref, () => ({
    reset,
    clear,
  }))

  const notifyClass = classNames('s-notify', 's-notify-' + type, className)
  const notifyStyle = {
    color,
    background,
    ...style,
  }

  return (
    <Popup
      {...restPopupProps}
      mask={mask}
      visible={visible}
      placement={placement}
      lockScroll={lockScroll}
    >
      <div {...(restProps as any)} className={notifyClass} style={notifyStyle}>
        {message}
      </div>
    </Popup>
  )
}) as NotifyFC

Notify.show = show
Notify.info = info
Notify.success = success
Notify.warning = warning
Notify.error = error
Notify.hide = hide
Notify.Agent = NotifyAgent

export { NotifyAgent }

export default Notify
