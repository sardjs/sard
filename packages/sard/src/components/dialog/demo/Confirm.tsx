/*
### 确认框
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
        showCancel
        title="提示"
        message="确定删除？"
        onVisible={setVisible}
      ></Dialog>
    </>
  )
}
