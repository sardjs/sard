/*
### 下划线类型
*/

import { PasswordInput } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState('')

  return (
    <>
      <PasswordInput
        value={value}
        onChange={setValue}
        native
        type="underline"
      />
    </>
  )
}
