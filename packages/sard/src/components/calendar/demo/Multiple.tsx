/*
### 选择多个日期
*/

import { Popout, Calendar, Input } from 'sard'

export default function () {
  return (
    <Popout title="请选择日期">
      <Popout.Target select value clear>
        <Input
          type="textarea"
          rows={3}
          readOnly
          placeholder="请选择日期"
          clearable
        />
      </Popout.Target>
      <Popout.Bridge>
        <Calendar type="multiple" defaultValue={['2022-09-25', '2022-09-28']} />
      </Popout.Bridge>
    </Popout>
  )
}
