/*
### 明文显示
*/

import { PasswordInput } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState('')

  return (
    <>
      <PasswordInput value={value} onChange={setValue} native plainText />
    </>
  )
}
