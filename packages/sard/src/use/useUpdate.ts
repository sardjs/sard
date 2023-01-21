/**
 * 强制更新
 * ==========================
 */

import { useState, useCallback } from 'react'

export function useUpdate() {
  const [, setState] = useState({})

  return useCallback(() => {
    setState({})
  }, [])
}

export default useUpdate
