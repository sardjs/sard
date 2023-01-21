import { useEffect } from 'react'
import { throttle, DebounceOptions } from '../utils'
import { useEvent } from './useEvent'

export function useScroll(
  func: (...args: any[]) => any,
  wait: any,
  options?: DebounceOptions,
  target: { current: any } = { current: window },
) {
  const fn = useEvent(func)

  useEffect(() => {
    const handler = throttle(fn, wait, options)
    target.current?.addEventListener('scroll', handler)

    return () => {
      target.current?.removeEventListener('scroll', handler)
    }
  }, [])
}

export default useScroll
