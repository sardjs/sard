import { createElement } from 'react'
import { ImagePreviewProps } from './index'
import { idAgentMap, ImagePreviewAgent } from './Agent'
import { mountComponent } from '../../utils/imperative'

export interface ImagePreviewOptions extends ImagePreviewProps {
  id?: string
}

export const show = (props: ImagePreviewProps) => {
  const { id = 'image-preview' } = props

  const ref = idAgentMap[id]

  if (ref) {
    ref.current?.show(props)
  } else {
    const { mount, unmount, container } = mountComponent()

    const element = createElement(ImagePreviewAgent, {
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
