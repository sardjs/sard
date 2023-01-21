/*
### 基础使用
*/

import { useState } from 'react'
import { Toast, ToastProps, Button } from 'sard'

export default function () {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<ToastProps['type']>('text')
  const [title, setTitle] = useState<ToastProps['title']>('')

  const showToast = (type: ToastProps['type'], title: ToastProps['title']) => {
    setType(type)
    setTitle(title)
    setVisible(true)
  }

  const handleTimeout = () => {
    setVisible(false)
  }

  const hideToast = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={() => showToast('text', '文本提示')}>文本提示</Button>{' '}
      <Button onClick={() => showToast('success', '成功')}>成功提示</Button>{' '}
      <Button onClick={() => showToast('fail', '失败')}>失败提示</Button>{' '}
      <Button onClick={() => showToast('loading', '加载中')}>加载中提示</Button>{' '}
      <Button onClick={() => hideToast()}>隐藏提示</Button>
      <Toast
        visible={visible}
        type={type}
        title={title}
        onTimeout={handleTimeout}
      ></Toast>
    </>
  )
}
