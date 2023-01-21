/*
### 类型

可以使用 'yMdhms'（年月日时分秒）进行任意组合
*/

import { DatetimePicker } from 'sard'

export default function () {
  return (
    <>
      <p>年月日：</p>
      <DatetimePicker type="yMd" />

      <p>时分秒：</p>
      <DatetimePicker type="hms" />

      <p>日时分</p>
      <DatetimePicker type="dhm" />
    </>
  )
}
