import {
  MouseEventHandler,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { createStrike, Strike, PartialConfig } from '../strike'

export type UseStrikeConfig = PartialConfig

export interface UseStrikeBinding {
  onTouchStart: TouchEventHandler
  onTouchMove: TouchEventHandler
  onTouchEnd: TouchEventHandler
  onTouchCancel: TouchEventHandler
  onMouseDown: MouseEventHandler
}

export function useStrike(
  callback: (strike: Strike) => void,
  config: UseStrikeConfig = {},
  init = true,
): UseStrikeBinding {
  const strike = useRef<Strike>()
  const unsubscribe = useRef<any>()

  useEffect(() => {
    strike.current = createStrike({
      ...config,
      init: false,
    })
    return () => {
      strike.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (strike.current) {
      if (init) {
        strike.current.init()
        unsubscribe.current = callback(strike.current)
      } else {
        strike.current.destroy()
        if (typeof unsubscribe.current === 'function') {
          unsubscribe.current()
          unsubscribe.current = null
        }
      }
    }
  }, [init])

  const eventHandler = useCallback((event: TouchEvent | MouseEvent) => {
    strike.current?.handler(event)
  }, [])

  useEffect(() => {
    strike.current?.configure(config)
  }, [config])

  return {
    onTouchStart: eventHandler as unknown as TouchEventHandler,
    onTouchMove: eventHandler as unknown as TouchEventHandler,
    onTouchEnd: eventHandler as unknown as TouchEventHandler,
    onTouchCancel: eventHandler as unknown as TouchEventHandler,
    onMouseDown: eventHandler as unknown as MouseEventHandler,
  }
}

export function useMergeStrike(handlerList: UseStrikeBinding[]) {
  const onTouchStart = useCallback((event: React.TouchEvent) => {
    handlerList.forEach((strikeBinding) => strikeBinding.onTouchStart(event))
  }, [])

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    handlerList.forEach((strikeBinding) => strikeBinding.onTouchMove(event))
  }, [])

  const onTouchEnd = useCallback((event: React.TouchEvent) => {
    handlerList.forEach((strikeBinding) => strikeBinding.onTouchEnd(event))
  }, [])

  const onTouchCancel = useCallback((event: React.TouchEvent) => {
    handlerList.forEach((strikeBinding) => strikeBinding.onTouchCancel(event))
  }, [])

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    handlerList.forEach((strikeBinding) => strikeBinding.onMouseDown(event))
  }, [])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    onMouseDown,
  }
}

export default useStrike
