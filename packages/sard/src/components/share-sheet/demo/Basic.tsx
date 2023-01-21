/*
### 基础使用
*/

import { ShareSheet, ActionSheetItemProps, Toast, Button } from 'sard'
import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [visible, setVisible] = useState(false)
  const itemList = [
    {
      title: 'Wechat',
      icon: {
        fullName: 'bi-wechat',
        frameColor: '#0bc15f',
      },
    },
    {
      title: 'Alipay',
      icon: {
        fullName: 'bi-alipay',
        frameColor: '#1677ff',
      },
    },
    {
      title: 'Twitter',
      icon: {
        fullName: 'bi-twitter',
        frameColor: '#1d9bf0',
      },
    },
    {
      title: 'Facebook',
      icon: {
        fullName: 'bi-facebook',
        frameColor: '#1877f2',
      },
    },
  ]

  const handleSelect = (item: ActionSheetItemProps) => {
    setVisible(false)
    Toast.text(item.title as string)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示分享面板</Button>
      <ShareSheet
        visible={visible}
        itemList={itemList}
        cancel="取消"
        onSelect={handleSelect}
        onCancel={handleCancel}
      />
    </>
  )
}
