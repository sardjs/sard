/*
### 最大最小值
*/

import { DatetimePicker } from 'sard'

export default function () {
  return (
    <>
      <p>年月日：</p>
      <DatetimePicker
        type="yMd"
        min={new Date(2021, 4, 13)}
        max={new Date(2023, 6, 8)}
      />

      <p>时分秒：</p>
      <DatetimePicker
        type="hms"
        min={new Date(0, 0, 1, 9, 0, 0)}
        max={new Date(0, 0, 1, 18, 30, 0)}
      />

      <p>日时分：</p>
      <DatetimePicker
        type="dhm"
        min={new Date(0, 0, 1, 9, 45)}
        max={new Date(0, 0, 6, 12, 12)}
      />
    </>
  )
}
