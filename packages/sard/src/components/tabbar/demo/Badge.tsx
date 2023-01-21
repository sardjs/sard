/*
### 徽标
*/

import { useState } from 'react'
import { Tabbar } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChange = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <Tabbar activeIndex={activeIndex} fixed={false} onChange={handleChange}>
      <Tabbar.Item icon={{ fullName: 'bi-house-door-fill' }}>首页</Tabbar.Item>
      <Tabbar.Item icon={{ fullName: 'bi-cart-fill' }}>购物车</Tabbar.Item>
      <Tabbar.Item
        icon={{ fullName: 'bi-chat-dots-fill' }}
        badge={{ value: 5 }}
      >
        消息
      </Tabbar.Item>
      <Tabbar.Item
        icon={{ fullName: 'bi-person-circle' }}
        badge={{ isDot: true, color: 'orange' }}
      >
        我的
      </Tabbar.Item>
    </Tabbar>
  )
}
