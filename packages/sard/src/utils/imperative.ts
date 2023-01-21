import {
  createElement,
  useState,
  useRef,
  ReactNode,
  useEffect,
  MutableRefObject,
} from 'react'

import { createRoot } from 'react-dom/client'

export function mountComponent() {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const root = createRoot(container)

  return {
    unmount() {
      setTimeout(() => {
        root.unmount()
        document.body.removeChild(container)
      })
    },
    mount(element: ReactNode) {
      root.render(element)
    },
    container,
  }
}

export type AgentProps<
  ComponentProps extends { onVisible?(visible: boolean): void },
> = {
  id?: string
  $$afterRender?: () => void
} & ComponentProps

export interface AgentRef<ComponentProps> {
  show(props: ComponentProps): void
  hide(): void
}

export interface IdAgentMap<ComponentProps, ComponentRef> {
  [id: string]: MutableRefObject<AgentRef<ComponentProps> & ComponentRef>
}

export function useAgent<
  ComponentProps extends { onVisible?(visible: boolean): void },
  ComponentRef,
>(
  component,
  agentProps: AgentProps<ComponentProps>,
  idAgentMap: IdAgentMap<ComponentProps, ComponentRef>,
  defaultId: string,
) {
  const { id = defaultId, $$afterRender, ...restProps } = agentProps

  const [visible, setVisible] = useState(false)
  const [props, setProps] = useState<ComponentProps>()

  const componentRef = useRef<ComponentRef>(null)

  const ref = useRef<ComponentRef & AgentRef<ComponentProps>>()

  useEffect(() => {
    idAgentMap[id] = ref

    return () => {
      delete idAgentMap[id]
    }
  }, [id])

  useEffect(() => {
    ref.current = {
      show(props) {
        setProps(props)
        setVisible(true)
      },
      hide() {
        setVisible(false)
      },
      ...componentRef.current,
    }

    $$afterRender?.()
  }, [])

  return createElement(component, {
    ...restProps,
    ...props,
    visible,
    onVisible(visible) {
      setVisible(visible)
      agentProps.onVisible?.(visible)
    },
    ref: componentRef,
  } as any)
}
