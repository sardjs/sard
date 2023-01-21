/*
### 类型
*/

import { useState, useRef } from 'react'
import { Notify, NotifyProps, NotifyRef, Button } from 'sard'

export default function () {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<NotifyProps['type']>()
  const ref = useRef<NotifyRef>(null)

  const showNotification = (type: NotifyProps['type']) => {
    ref.current?.reset()
    setType(type)
    setVisible(true)
  }

  return (
    <>
      <Button onClick={() => showNotification('info')}>信息通知</Button>{' '}
      <Button onClick={() => showNotification('success')}>成功通知</Button>{' '}
      <Button onClick={() => showNotification('warning')}>警告通知</Button>{' '}
      <Button onClick={() => showNotification('error')}>错误通知</Button>
      <Notify
        ref={ref}
        type={type}
        visible={visible}
        message="这是一条通知"
        onTimeout={() => setVisible(false)}
      />
    </>
  )
}
