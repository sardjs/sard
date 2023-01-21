/*
### 自定义内容
*/

import { Badge, Icon, Button } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Badge value={<Icon fullName="bi-cup-hot"></Icon>}>
      <Button>消息</Button>
    </Badge>
  )
}
