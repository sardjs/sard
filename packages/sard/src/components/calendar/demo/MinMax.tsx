/*
### 自定义日期范围
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <Popout title="请选择日期">
      <Popout.Target select value clear>
        <Input readOnly placeholder="请选择日期" clearable />
      </Popout.Target>
      <Popout.Bridge>
        <Calendar min="2022-08-25" max="2022-08-28" />
      </Popout.Bridge>
    </Popout>
  )
}
