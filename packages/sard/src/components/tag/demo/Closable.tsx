/*
### 可关闭的
*/

import { Tag } from 'sard'

export default function () {
  return (
    <>
      <Tag closable onClose={() => console.log('close')}>
        标签
      </Tag>
    </>
  )
}
