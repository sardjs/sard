/*
### 异步关闭
*/

import { Dialog, DialogProps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)

  const handleBeforeClose: DialogProps['beforeClose'] = (done, type) => {
    if (type === 'confirm') {
      setTimeout(() => {
        done()
      }, 1000)
    } else {
      done()
    }
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示对话框</Button>
      <Dialog
        visible={visible}
        showCancel
        title="提示"
        message="确定删除？"
        beforeClose={handleBeforeClose}
        onVisible={setVisible}
      ></Dialog>
    </>
  )
}
