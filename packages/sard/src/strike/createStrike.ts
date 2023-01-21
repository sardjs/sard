import { createInput, StrikeInputHandler } from './createInput'
import { createGestures } from './createGestures'
import { createFingers } from './createFingers'
import { createEvent } from './createEvent'
import { createChopsticks } from './createChopsticks'
import { defaultConfig, PartialConfig } from './defaultConfig'

export type { PartialConfig } from './defaultConfig'

export interface Strike {
  on(type: string, handler: (...args: any[]) => any): void
  once(type: string, handler: (...args: any[]) => any): void
  off(type?: string, handler?: (...args: any[]) => any): void
  emit(type: string, payload?: any): void
  init(): void
  destroy(): void
  configure(partialConfig?: PartialConfig): void
  handler: StrikeInputHandler
}

export function createStrike(partialConfig?: PartialConfig): Strike {
  const config = Object.assign({}, defaultConfig, partialConfig)
  let initialized = false

  const eventTarget = {}

  function on(type: string, handler: (...args: any[]) => any) {
    event.on(eventTarget, type, handler)
  }

  function once(type: string, handler: (...args: any[]) => any) {
    event.once(eventTarget, type, handler)
  }

  function off(type?: string, handler?: (...args: any[]) => any) {
    event.off(eventTarget, type, handler)
  }

  function emit(type: string, payload?: any) {
    event.off(eventTarget, type, payload)
  }

  const event = createEvent()
  const fingers = createFingers(eventTarget, config)
  const chopsticks = createChopsticks(fingers.knocks)
  const gestures = createGestures(fingers, chopsticks, event, config)
  const input = createInput(fingers, chopsticks, gestures, config)

  function init() {
    if (initialized) {
      return
    }
    input.init()
    initialized = true
  }

  function destroy() {
    if (!initialized) {
      return
    }
    input.destroy()
    event.off(eventTarget)
    fingers.clear()
    chopsticks.clear()
    initialized = false
  }

  function configure(partialConfig?: PartialConfig) {
    Object.assign(config, partialConfig)
  }

  if (config.init) {
    init()
  }

  return {
    on,
    once,
    off,
    emit,
    init,
    destroy,
    configure,
    handler: input.handler,
  }
}
