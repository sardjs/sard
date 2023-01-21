/*
### 紧凑类型
*/

import { Popout, Button, Toast } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示弹出框</Button>
      <Popout
        visible={visible}
        title="标题"
        type="compact"
        onClose={setVisible}
        onConfirm={() => Toast.text('确定')}
        onCancel={() => Toast.text('取消')}
      >
        <div>弹出框内容</div>
        <div>弹出框内容</div>
        <div>弹出框内容</div>
      </Popout>
    </>
  )
}
