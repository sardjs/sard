export interface EventType {
  on(
    target: object | null,
    type: string,
    handler: (...args: any[]) => any,
  ): void
  off(
    target: object | null,
    type?: string,
    handler?: (...args: any[]) => any,
  ): void
  emit(target: object | null, type: string, payload?: any): void
  once(
    target: object | null,
    type: string,
    handler: (...args: any[]) => any,
  ): void
}

export function createEvent(): EventType {
  const events = new WeakMap()

  const on: EventType['on'] = (target, type, handler) => {
    let eventData, handlers
    if (!target) {
      return
    }
    if (!(eventData = events.get(target))) {
      events.set(target, (eventData = {}))
    }
    if (!(handlers = eventData[type])) {
      handlers = eventData[type] = new Set()
    }
    handlers.add(handler)
  }

  const off: EventType['off'] = (target, type?, handler?) => {
    let eventData, handlers
    if (!target) {
      return
    }
    if (!(eventData = events.get(target))) {
      return
    }
    if (!type) {
      return events.delete(target)
    }
    if (!(handlers = eventData[type])) {
      return
    }
    if (!handler) {
      delete eventData[type]
      if (Object.keys(eventData).length === 0) {
        off(target)
      }
      return
    }
    handlers.delete(handler)
    if (handlers.size === 0) {
      off(target, type)
    }
  }

  const emit: EventType['emit'] = (target, type, payload?) => {
    let eventData, handlers
    if (!target) {
      return
    }
    if (!(eventData = events.get(target))) {
      return
    }
    if (!(handlers = eventData[type])) {
      return
    }
    handlers.forEach((handler: (...args: any[]) => any) => {
      handler(payload)
    })
  }

  const once: EventType['once'] = (target, type, handler) => {
    const oldHandler = handler
    handler = () => {
      oldHandler()
      off(target, type, handler)
    }
  }

  return {
    on,
    off,
    emit,
    once,
  }
}

export const event = createEvent()
