/*
### 独立展示
*/

import { Badge } from 'sard'

export default function () {
  return (
    <>
      <Badge value={10}></Badge>
      <Badge isDot style={{ marginLeft: '10px' }}></Badge>
    </>
  )
}
