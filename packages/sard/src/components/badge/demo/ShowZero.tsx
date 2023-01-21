/*
### 值为0时不隐藏

值为0时，会隐藏，可通过 showZero 让其值为0时依然显示。
*/

import { Badge, Button } from 'sard'

export default function () {
  return (
    <>
      <Badge value={0}>
        <Button>消息</Button>
      </Badge>
      <Badge value={0} showZero style={{ marginLeft: '20px' }}>
        <Button>消息</Button>
      </Badge>
    </>
  )
}
