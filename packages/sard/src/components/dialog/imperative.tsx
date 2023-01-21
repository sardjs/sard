import { createElement } from 'react'
import { DialogProps } from './index'
import { idAgentMap, DialogAgent } from './Agent'
import { mountComponent } from '../../utils/imperative'

export interface DialogOptions extends DialogProps {
  id?: string
}

export const show = (props: DialogOptions) => {
  const { id = 'dialog' } = props

  const ref = idAgentMap[id]

  if (ref) {
    ref.current?.show(props)
  } else {
    const { mount, unmount, container } = mountComponent()

    const element = createElement(DialogAgent, {
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

export const alert = (props: DialogOptions) => {
  show({ ...props, showCancel: false })
}

export const confirm = (props: DialogOptions) => {
  show({ ...props, showCancel: true })
}
