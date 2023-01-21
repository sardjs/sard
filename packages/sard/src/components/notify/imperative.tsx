import { createElement, ReactNode } from 'react'
import { NotifyProps } from './index'
import { isNotReactNode } from '../../utils'
import { mountComponent } from '../../utils/imperative'
import { idAgentMap, NotifyAgent } from './Agent'

export interface NotifyShortcut {
  (propsOrMessage: ReactNode | NotifyProps, props?: NotifyProps): void
}

export interface NotifyShow {
  (
    propsOrTitle: ReactNode | NotifyProps,
    props?: NotifyProps,
    innerType?: NotifyProps['type'],
  ): void
}

export const show: NotifyShow = (propsOrMessage, props = {}, innerType) => {
  if (isNotReactNode(propsOrMessage)) {
    props = propsOrMessage as NotifyProps
  } else {
    props.message = propsOrMessage as ReactNode
  }

  if (innerType) {
    props.type = innerType
  }

  const { id = 'notify' } = props

  const ref = idAgentMap[id]

  if (ref) {
    ref.current?.reset()
    ref.current?.show(props)
  } else {
    const { mount, unmount, container } = mountComponent()

    const element = createElement(NotifyAgent, {
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

export const info: NotifyShortcut = (propsOrMessage, props) => {
  show(propsOrMessage, props, 'info')
}

export const success: NotifyShortcut = (propsOrMessage, props) => {
  show(propsOrMessage, props, 'success')
}

export const warning: NotifyShortcut = (propsOrMessage, props) => {
  show(propsOrMessage, props, 'warning')
}

export const error: NotifyShortcut = (propsOrMessage, props) => {
  show(propsOrMessage, props, 'error')
}

export const hide = () => {
  Object.keys(idAgentMap).forEach((key) => idAgentMap[key]?.current?.hide())
}
