/*
### 自定义颜色
*/

import { Badge, Button } from 'sard'

export default function () {
  return (
    <>
      <Badge value={5} color="orange">
        <Button>消息</Button>
      </Badge>
      <Badge value={5} color="rebeccapurple" style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
      <Badge isDot color="orange" style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
      <Badge isDot color="rebeccapurple" style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
    </>
  )
}
