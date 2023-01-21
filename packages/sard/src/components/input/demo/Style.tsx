/*
### 自定义样式
*/

import { Input } from 'sard'

export default function () {
  const style = {
    color: 'red',
    borderColor: 'red',
  }
  return <Input style={style} placeholder="自定义样式" />
}
