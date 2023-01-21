/*
### 最大值

默认超过99的值会显示99+，可以通过max设置最大显示数值
*/

import { Badge, Button } from 'sard'

export default function () {
  return (
    <>
      <Badge value={100}>
        <Button>消息</Button>
      </Badge>
      <Badge value={100} max={200} style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
    </>
  )
}
