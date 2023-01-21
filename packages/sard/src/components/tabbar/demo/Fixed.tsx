/*
### 固定定位
*/

import { useState } from 'react'
import { Tabbar, Checkbox } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fixed, setFixed] = useState(false)

  const handleChange = (index: number) => {
    setActiveIndex(index)
  }

  const handleCheckChange = (checked: boolean) => {
    setFixed(checked)
  }

  return (
    <>
      <Checkbox onChange={handleCheckChange} style={{ marginBottom: 20 }}>
        固定定位
      </Checkbox>

      <Tabbar activeIndex={activeIndex} fixed={fixed} onChange={handleChange}>
        <Tabbar.Item icon={{ fullName: 'bi-house-door-fill' }}>
          首页
        </Tabbar.Item>
        <Tabbar.Item icon={{ fullName: 'bi-cart-fill' }}>购物车</Tabbar.Item>
        <Tabbar.Item icon={{ fullName: 'bi-chat-dots-fill' }}>消息</Tabbar.Item>
        <Tabbar.Item icon={{ fullName: 'bi-person-circle' }}>我的</Tabbar.Item>
      </Tabbar>
    </>
  )
}
