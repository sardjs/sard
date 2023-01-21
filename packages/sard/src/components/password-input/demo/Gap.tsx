/*
### 间距
*/

import { PasswordInput } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState('')

  return (
    <>
      <PasswordInput value={value} onChange={setValue} native gap={0} />
    </>
  )
}
