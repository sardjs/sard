/*
### 配合弹出框使用
*/

import { Picker, PickerColumnOption, Popout, Input } from 'sard'

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
      <Popout title="请选择班级">
        <Popout.Target
          select
          value
          clear
          format={(_, options: PickerColumnOption[]) =>
            options.map((option) => option.label).join('/')
          }
        >
          <Input readOnly placeholder="请选择班级" clearable />
        </Popout.Target>
        <Popout.Bridge>
          <Picker columns={columns} />
        </Popout.Bridge>
      </Popout>
    </>
  )
}
