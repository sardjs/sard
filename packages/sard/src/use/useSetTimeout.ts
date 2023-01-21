import { useEffect, useRef } from 'react'
import { useEvent } from './useEvent'

export function useSetTimeout(
  callback: (...args: any[]) => any,
  duration: number,
  canReset: (...args: any[]) => any = () => true,
) {
  const timer = useRef(0)

  const func = useEvent(callback)
  const canResetCallback = useEvent(canReset)

  const clear = useEvent(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = 0
    }
  })

  const reset = useEvent(() => {
    clear()
    if (duration !== 0 && canResetCallback()) {
      timer.current = setTimeout(func, duration) as unknown as number
    }
  })

  useEffect(() => clear, [])

  return {
    clear,
    reset,
  }
}

export default useSetTimeout
