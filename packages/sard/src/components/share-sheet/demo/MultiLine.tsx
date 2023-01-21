/*
### 多行
*/

import { ShareSheet, ActionSheetItemProps, Toast, Button } from 'sard'
import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [visible, setVisible] = useState(false)
  const itemList = [
    [
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
    ],
    [
      {
        title: 'Spotify',
        icon: {
          fullName: 'bi-spotify',
          frameColor: '#1ed760',
        },
      },
      {
        title: 'Tiktok',
        icon: {
          fullName: 'bi-tiktok',
          frameColor: '#000',
        },
      },
      {
        title: 'Skype',
        icon: {
          fullName: 'bi-skype',
          frameColor: '#0b64a4',
        },
      },
      {
        title: 'Youtube',
        icon: {
          fullName: 'bi-youtube',
          frameColor: '#ff0000',
        },
      },
      {
        title: 'Paypal',
        icon: {
          fullName: 'bi-paypal',
          frameColor: '#0070ba',
        },
      },
      {
        title: 'Whatsapp',
        icon: {
          fullName: 'bi-whatsapp',
          frameColor: '#128c7e',
        },
      },
      {
        title: 'Telegram',
        icon: {
          fullName: 'bi-telegram',
          frameColor: '#0088cc',
        },
      },
      {
        title: 'Snapchat',
        icon: {
          fullName: 'bi-snapchat',
          color: '#000',
          frameColor: '#fffc00',
        },
      },
    ],
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
        title="分享到"
        visible={visible}
        itemList={itemList}
        cancel="取消"
        onSelect={handleSelect}
        onCancel={handleCancel}
      />
    </>
  )
}
