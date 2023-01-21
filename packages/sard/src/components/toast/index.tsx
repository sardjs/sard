import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  ReactNode,
  CSSProperties,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import classNames from 'classnames'
import { Loading, LoadingProps } from '../loading'
import { Popup, PopupProps } from '../popup'
import { Icon } from '../icon'
import { useSetTimeout } from '../../use'
import { CommonComponentProps } from '../../utils/types'

import { show, text, success, fail, loading, hide } from './imperative'
import { ToastAgent } from './Agent'

export interface ToastProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  type?: 'text' | 'loading' | 'success' | 'fail' | 'custom'
  title?: ReactNode
  icon?: ReactNode
  loadingProps?: LoadingProps
  duration?: number
  onTimeout?: () => void
  visible?: boolean
  onVisible?: (visible: boolean) => void
  popupProps?: PopupProps
}

export interface ToastRef {
  clear: () => void
  reset: () => void
}

export interface ToastFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<ToastProps> & RefAttributes<ToastRef>
  > {
  show: typeof show
  text: typeof text
  success: typeof success
  fail: typeof fail
  loading: typeof loading
  hide: typeof loading
  Agent: typeof ToastAgent
}

export const Toast: ToastFC = forwardRef((props, ref) => {
  const {
    className,
    type = 'text',
    title,
    icon,
    loadingProps,
    duration = 1500,
    onTimeout,
    visible = false,
    onVisible,
    popupProps = {},
    ...restProps
  } = props

  const {
    mask = false,
    placement = 'center-fade',
    lockScroll = false,
    ...restPopupProps
  } = popupProps

  const { reset, clear } = useSetTimeout(
    () => {
      onTimeout?.()
      onVisible?.(false)
    },
    duration,
    () => type !== 'loading',
  )

  useEffect(() => {
    if (visible) {
      reset()
    } else {
      clear()
    }
  }, [visible])

  useEffect(() => {
    reset()
  }, [duration, type])

  useImperativeHandle(ref, () => ({
    reset,
    clear,
  }))

  const toastClass = classNames(
    's-toast',
    {
      's-toast-text': type === 'text',
    },
    className,
  )

  return (
    <Popup
      {...restPopupProps}
      visible={visible}
      placement={placement}
      lockScroll={lockScroll}
      mask={mask}
    >
      <div {...(restProps as any)} className={toastClass}>
        {type !== 'text' && (
          <div className="s-toast-icon">
            {icon ||
              (type === 'loading' ? (
                <Loading {...loadingProps}></Loading>
              ) : (
                <Icon prefix="si" name={type} size="1em"></Icon>
              ))}
          </div>
        )}
        <div className="s-toast-title">{title}</div>
      </div>
    </Popup>
  )
}) as ToastFC

Toast.show = show
Toast.text = text
Toast.success = success
Toast.fail = fail
Toast.loading = loading
Toast.hide = hide
Toast.Agent = ToastAgent

export default Toast
