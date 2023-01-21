import { useCallback, useEffect, useRef, useState } from 'react'

interface Callback<S> {
  (state: S): void
}

export function useCallbackState<S>(
  initialState: S | (() => S),
): [S, (nextState: S, cb?: Callback<S>) => void] {
  const [state, setState] = useState(initialState)

  const callback = useRef<Callback<S>>()

  const setCallbackState = useCallback((nextState: S, cb?: Callback<S>) => {
    setState((prevState) => {
      callback.current = cb
      return typeof nextState === 'function' ? nextState(prevState) : nextState
    })
  }, [])

  useEffect(() => {
    if (typeof callback.current === 'function') {
      callback.current(state)
    }
  }, [state])

  return [state, setCallbackState]
}

export default useCallbackState
