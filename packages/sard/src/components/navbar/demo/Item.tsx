/*
### 导航项

可以在 left | right 插槽中放置导航项。
*/

import { Navbar, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Navbar
      title="标题"
      left={
        <Navbar.Item onClick={() => console.log('返回')}>
          <Icon fullName="bi-chevron-left" size={16}></Icon>
          <span>返回</span>
        </Navbar.Item>
      }
      right={
        <Navbar.Item onClick={() => console.log('更多')}>
          <Icon fullName="bi-three-dots" size={16}></Icon>
        </Navbar.Item>
      }
    />
  )
}
