/*
### 自定义颜色
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
    <Tabbar
      activeIndex={activeIndex}
      color="rebeccapurple"
      activeColor="orange"
      fixed={false}
      onChange={handleChange}
    >
      <Tabbar.Item icon={{ fullName: 'bi-house-door-fill' }}>首页</Tabbar.Item>
      <Tabbar.Item icon={{ fullName: 'bi-cart-fill' }}>购物车</Tabbar.Item>
      <Tabbar.Item icon={{ fullName: 'bi-chat-dots-fill' }}>消息</Tabbar.Item>
      <Tabbar.Item icon={{ fullName: 'bi-person-circle' }}>我的</Tabbar.Item>
    </Tabbar>
  )
}
