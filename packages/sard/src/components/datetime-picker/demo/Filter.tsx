/*
### 过滤器
*/

import { DatetimePicker, DatetimeLetter } from 'sard'

export default function () {
  const filter = (letter: DatetimeLetter, value: number) => {
    if (letter === 'm') {
      return value % 15 === 0
    }
    return true
  }

  return (
    <>
      <p>“分钟”取15的倍数</p>
      <DatetimePicker type="hm" filter={filter} />
    </>
  )
}
