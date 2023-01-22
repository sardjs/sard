/*
### 自定义颜色
*/

import { useState } from 'react'
import { Notify, Button } from 'sard'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示通知</Button>
      <Notify
        visible={visible}
        color="black"
        background="cyan"
        message="这是一条通知"
        onTimeout={() => setVisible(false)}
      />
    </>
  )
}
