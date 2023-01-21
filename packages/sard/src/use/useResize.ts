import { useEffect } from 'react'
import { throttle, DebounceOptions } from '../utils'
import { onWindowResize, offWindowResize } from '../utils/dom'
import { useEvent } from './useEvent'

export function useResize(
  func: (...args: any[]) => any,
  wait: any,
  options?: DebounceOptions,
) {
  const fn = useEvent(func)

  useEffect(() => {
    const handler = throttle(fn, wait, options)
    onWindowResize(handler as any)

    return () => {
      offWindowResize(handler as any)
    }
  }, [])
}

export default useResize
