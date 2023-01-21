/*
### 结合数字键盘使用
*/

import { PasswordInput, NumberKeyboard } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState('')

  return (
    <>
      <NumberKeyboard onChange={setValue} maxLength={6} focusedProp="focused">
        <PasswordInput value={value} />
      </NumberKeyboard>
    </>
  )
}
