/*
### 基础使用
*/

import { NumberKeyboard, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>弹出键盘</Button>
      <NumberKeyboard visible={visible} onVisible={setVisible} />
    </>
  )
}
