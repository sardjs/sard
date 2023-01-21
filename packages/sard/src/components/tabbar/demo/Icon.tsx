/*
### 自定义图标

传递接收当前活动状态作为参数的函数并返回 ReactNode
*/

import { useState } from 'react'
import { Tabbar, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChange = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <Tabbar activeIndex={activeIndex} fixed={false} onChange={handleChange}>
      <Tabbar.Item
        icon={(active) => (
          <Icon fullName={active ? 'bi-house-door-fill' : 'bi-house-door'} />
        )}
      >
        首页
      </Tabbar.Item>
      <Tabbar.Item icon={{ fullName: 'bi-cart-fill' }}>购物车</Tabbar.Item>
      <Tabbar.Item icon={{ fullName: 'bi-chat-dots-fill' }}>消息</Tabbar.Item>
      <Tabbar.Item icon={{ fullName: 'bi-person-circle' }}>我的</Tabbar.Item>
    </Tabbar>
  )
}
