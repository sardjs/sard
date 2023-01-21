/*
### 自定义字段名
*/

import { Picker } from 'sard'

export default function () {
  const columns = Array(2)
    .fill(0)
    .map((_, i) =>
      Array(10)
        .fill(0)
        .map((_, j) => ({
          id: `${i}-${j}`,
          text: `${i + 1}年级${j + 1}班`,
        })),
    )

  return (
    <>
      <Picker columns={columns} fieldNames={{ value: 'id', label: 'text' }} />
    </>
  )
}
