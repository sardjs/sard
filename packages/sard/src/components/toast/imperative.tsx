import { createElement, ReactNode } from 'react'
import { ToastProps } from './index'
import { isNotReactNode } from '../../utils'
import { mountComponent } from '../../utils/imperative'
import { idAgentMap, ToastAgent } from './Agent'

export interface ToastShortcut {
  (propsOrTitle: ReactNode | ToastProps, props?: ToastProps): void
}

export interface ToastShow {
  (
    propsOrTitle: ReactNode | ToastProps,
    props?: ToastProps,
    internalType?: ToastProps['type'],
  ): void
}

export const show: ToastShow = (
  propsOrTitle,
  props = {},
  internalType = 'custom',
) => {
  if (isNotReactNode(propsOrTitle)) {
    props = propsOrTitle as ToastProps
  } else {
    props.title = propsOrTitle as ReactNode
  }

  if (internalType) {
    props.type = internalType
  }

  const { id = 'toast' } = props

  const ref = idAgentMap[id]

  if (ref) {
    ref.current?.reset()
    ref.current?.show(props)
  } else {
    const { mount, unmount, container } = mountComponent()

    const element = createElement(ToastAgent, {
      id,
      $$afterRender() {
        idAgentMap[id]?.current?.show(props)
      },
      popupProps: {
        container,
        onExited() {
          unmount()
        },
      },
    })

    mount(element)
  }
}

export const text: ToastShortcut = (propsOrTitle, props) => {
  show(propsOrTitle, props, 'text')
}

export const success: ToastShortcut = (propsOrTitle, props) => {
  show(propsOrTitle, props, 'success')
}

export const fail: ToastShortcut = (propsOrTitle, props) => {
  show(propsOrTitle, props, 'fail')
}

export const loading: ToastShortcut = (propsOrTitle, props) => {
  show(propsOrTitle, props, 'loading')
}

export const hide = () => {
  Object.keys(idAgentMap).forEach((key) => idAgentMap[key]?.current?.hide())
}
