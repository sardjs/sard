import {
  Children,
  cloneElement,
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { shuffle } from '../../utils'
import { Icon } from '../icon'
import { Button, ButtonProps } from '../button'
import { Popup, PopupProps } from '../popup'
import { useEvent } from '../../use'

export interface NumberKeyboardProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactElement
  title?: ReactNode
  cancelText?: ReactNode
  cancelProps?: ButtonProps
  confirmText?: ReactNode
  confirmProps?: ButtonProps
  value?: string
  defaultValue?: string
  onKeyClick?: (key: string) => void
  onChange?: (value: string) => void
  onDelete?: () => void
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  onClose?: (visible: false) => void
  onCancel?: (visible: false) => void
  onConfirm?: (visible: false) => void
  extraKey?: string
  random?: boolean
  triggerProp?: string
  hideType?: string
  focusedProp?: string
  maxLength?: number
  popupProps?: PopupProps
}

export const NumberKeyboard: FC<NumberKeyboardProps> = (props) => {
  const {
    className,
    children,
    title,
    cancelText = '取消',
    cancelProps,
    confirmText = '完成',
    confirmProps,
    value,
    defaultValue,
    onKeyClick,
    onChange,
    onDelete,
    visible,
    defaultVisible,
    onVisible,
    onClose,
    onCancel,
    onConfirm,
    extraKey,
    random,
    triggerProp = 'onClick',
    hideType = 'click',
    focusedProp,
    maxLength = Infinity,
    popupProps = {},
    ...restProps
  } = props

  const {
    placement = 'bottom',
    mask = false,
    lockScroll = false,
    ...restPopupProps
  } = popupProps

  const [innerValue, setInnerValue] = useControlledValue<string>(props, {
    defaultValue: '',
  })

  const handleKeyClick = (key: string) => {
    if (innerValue.length >= maxLength) {
      return
    }
    setInnerValue(innerValue + key)
    onKeyClick?.(key)
  }

  const handleDelete = () => {
    setInnerValue(innerValue.slice(0, -1))
    onDelete?.()
  }

  const [innerVisible, setInnerVisible] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultVisible',
    valuePropName: 'visible',
    trigger: 'onVisible',
    defaultValue: false,
  })

  const keyboardRef = useRef<HTMLElement>(null)

  const setVisible = (show: boolean) => {
    setInnerVisible(show)
  }

  const handleCancel = useEvent(() => {
    setVisible(false)
    onCancel?.(false)
    onClose?.(false)
  })

  const handleConfirm = useEvent(() => {
    setVisible(false)
    onConfirm?.(false)
    onClose?.(false)
  })

  useEffect(() => {
    if (!innerVisible) {
      return
    }
    const handler = (event: Event) => {
      if (keyboardRef.current) {
        if (!keyboardRef.current.contains(event.target as HTMLElement)) {
          setVisible(false)
        }
      }
    }

    document.addEventListener(hideType, handler, true)

    return () => {
      document.removeEventListener(hideType, handler, true)
    }
  }, [hideType, innerVisible])

  const numArray = useMemo(() => {
    const arr = Array(10)
      .fill(0)
      .map((_, i) => (i + 1) % 10)

    if (random) {
      shuffle(arr, true)
    }
    return arr
  }, [random])

  const numberKeyboardClass = classNames(
    's-number-keyboard',
    {
      's-number-keyboard-has-extra': extraKey != null,
    },
    className,
  )

  let target: ReactElement | undefined
  try {
    target = Children.only(children)
  } catch {
    void 0
  }

  return (
    <>
      {target &&
        (() => {
          const targetProps = {
            ...target.props,
            [triggerProp]: (...args: any[]) => {
              setInnerVisible(true)
              target.props[triggerProp]?.(...args)
            },
          }
          if (focusedProp) {
            targetProps[focusedProp] = innerVisible
          }
          return cloneElement(target, targetProps)
        })()}
      <Popup
        {...restPopupProps}
        visible={innerVisible}
        placement={placement}
        mask={mask}
        lockScroll={lockScroll}
      >
        <div
          {...restProps}
          className={numberKeyboardClass}
          ref={keyboardRef as any}
        >
          <div className="s-number-keyboard-header">
            <Button
              className="s-number-keyboard-cancel s-number-keyboard-button"
              type="pale-text"
              theme="secondary"
              {...cancelProps}
              onClick={handleCancel}
            >
              {cancelText ?? (
                <Icon
                  prefix="si"
                  name="keyboard-hide"
                  className="s-number-keyboard-hide"
                />
              )}
            </Button>
            {title && <div className="s-number-keyboard-title">{title}</div>}
            <Button
              className="s-number-keyboard-confirm s-number-keyboard-button"
              type="pale-text"
              theme="primary"
              {...confirmProps}
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
          <div className="s-number-keyboard-body">
            {numArray.map((n, i) => (
              <div
                key={n}
                className={classNames('s-number-keyboard-key', {
                  's-number-keyboard-key-lastnum': i === 9,
                })}
                onClick={() => handleKeyClick(n + '')}
              >
                {n}
              </div>
            ))}
            {extraKey && (
              <div
                className="s-number-keyboard-key"
                onClick={() => handleKeyClick(extraKey + '')}
              >
                {extraKey}
              </div>
            )}
            <div className="s-number-keyboard-key" onClick={handleDelete}>
              <Icon prefix="si" name="backspace"></Icon>
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default NumberKeyboard
