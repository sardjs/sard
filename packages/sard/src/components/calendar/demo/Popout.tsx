/*
### 配合弹出框使用
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <Popout title="请选择日期">
      <Popout.Target select value clear>
        <Input readOnly placeholder="请选择日期" clearable />
      </Popout.Target>
      <Popout.Bridge>
        <Calendar />
      </Popout.Bridge>
    </Popout>
  )
}
