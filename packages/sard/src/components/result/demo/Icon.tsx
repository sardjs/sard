/*
### 自定义图标
*/

import { Result, Button, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Result
        icon={<Icon fullName="bi-cup-hot" color="gray"></Icon>}
        title="稍候"
        description="请根据提示进行操作"
        style={{ marginBottom: 30 }}
      ></Result>
    </>
  )
}
