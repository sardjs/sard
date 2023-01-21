/*
### 自定义尺寸和间距
*/

import { Rate } from 'sard'

export default function () {
  return (
    <>
      <div>
        <Rate defaultValue={3} size={30} />
      </div>

      <div>
        <Rate defaultValue={3} size={30} spacing={20} />
      </div>
    </>
  )
}
