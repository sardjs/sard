/*
### 基础使用
*/

import { Picker } from 'sard'

export default function () {
  const columns = Array(1)
    .fill(0)
    .map((_, i) =>
      Array(10)
        .fill(0)
        .map((_, j) => ({
          value: `${i}-${j}`,
          label: `${i + 1}年级${j + 1}班`,
        })),
    )

  return (
    <>
      <Picker columns={columns} />
    </>
  )
}
