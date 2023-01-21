/*
### 流动导航

默认 left | right 绝对定位于左右两侧，标题居中；可以使用 flow 使其变为流动布局。
*/

import { Navbar, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Navbar
      flow
      title="发现"
      titleStyle={{ textAlign: 'left' }}
      left={
        <Navbar.Item>
          <Icon fullName="bi-list"></Icon>
        </Navbar.Item>
      }
      right={
        <>
          <Navbar.Item>
            <Icon fullName="bi-search"></Icon>
          </Navbar.Item>
          <Navbar.Item>
            <Icon fullName="bi-bell"></Icon>
          </Navbar.Item>
          <Navbar.Item>
            <Icon fullName="bi-three-dots-vertical"></Icon>
          </Navbar.Item>
        </>
      }
    />
  )
}
