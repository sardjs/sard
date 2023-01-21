// !！！ 废弃了

import { useRef, useEffect } from 'react'

export function usePropRef<T>(prop: T) {
  const ref = useRef<T>(prop)

  useEffect(() => {
    ref.current = prop
  })

  return ref
}

export default usePropRef
