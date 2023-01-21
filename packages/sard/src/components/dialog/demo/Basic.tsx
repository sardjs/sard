/*
### 基础使用
*/

import { Dialog, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示对话框</Button>
      <Dialog
        visible={visible}
        title="提示"
        message="此功能暂时无法使用"
        onVisible={setVisible}
      ></Dialog>
    </>
  )
}
