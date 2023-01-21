/*
### 分组
*/

import { Cell } from 'sard'

export default function () {
  return (
    <>
      <Cell.Group title="分组标题" label="分组标签">
        <Cell title="标题" value="值" />
        <Cell title="标题" value="值" label="标签" />
      </Cell.Group>
    </>
  )
}
