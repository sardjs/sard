/*
### 自定义样式
*/

import { Tag } from 'sard'

export default function () {
  return (
    <>
      <Tag style={{ background: 'orange', color: 'white' }}>标签</Tag>
      <Tag
        plain
        style={{
          color: 'orange',
        }}
      >
        标签
      </Tag>
    </>
  )
}
