/**
 * 简化受控组件状态的操作
 * ==========================
 */

import { useRef, useMemo, SetStateAction } from 'react'
import useUpdate from './useUpdate'
import useEvent from './useEvent'

interface Options<T> {
  defaultValue?: T | (() => T)
  defaultValuePropName?: string
  valuePropName?: string
  trigger?: string
  preset?: (state: T) => T
}

export function useControlledValue<T = any>(
  props: any,
  options: Options<T> = {},
) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
    preset,
  } = options

  const value = props[valuePropName]
  const isControlled = value != null

  const stateRef = useRef<T>(
    useMemo(() => {
      const val = isControlled
        ? value
        : props[defaultValuePropName] ??
          (typeof defaultValue === 'function'
            ? (defaultValue as (...args: any[]) => any)()
            : defaultValue)
      return preset ? preset(val) : val
    }, []),
  )

  if (isControlled) {
    stateRef.current = preset ? preset(value) : value
  }

  const update = useUpdate()

  function setState(val: SetStateAction<T>, ...args: any[]) {
    const nextState =
      typeof val === 'function'
        ? (val as (...args: any[]) => any)(stateRef.current)
        : val

    if (nextState === stateRef.current) {
      return
    }

    if (!isControlled) {
      stateRef.current = nextState
      update()
    }
    props[trigger]?.(nextState, ...args)
  }

  return [stateRef.current, useEvent(setState)] as const
}

export default useControlledValue
