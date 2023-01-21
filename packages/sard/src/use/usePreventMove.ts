/**
 * ！！！已废弃
 * ===========
 * 原因：为了兼容小程序，不再通过addEventListener绑定事件，
 *      阻止滑动手势，推荐使用css的touch-action来实现。
 * */

import { useCallback, useEffect } from 'react'

export function usePreventMove<T>(ref: React.RefObject<T>) {
  const handler = useCallback((event: Event) => {
    event.preventDefault()
  }, [])

  const on = useCallback(() => {
    if (ref.current instanceof EventTarget) {
      ref.current.addEventListener('touchmove', handler, {
        passive: false,
      })
    }
  }, [])

  const off = useCallback(() => {
    if (ref.current instanceof EventTarget) {
      ref.current.removeEventListener('touchmove', handler)
    }
  }, [])

  useEffect(() => {
    on()
    return off
  }, [])

  return { on, off } as {
    on: () => void
    off: () => void
  }
}

export default usePreventMove
