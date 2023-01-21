import { useMemo } from 'react'
import { uniqid } from '../utils'

export function useSelectorId() {
  return useMemo(() => uniqid(), [])
}

export default useSelectorId
