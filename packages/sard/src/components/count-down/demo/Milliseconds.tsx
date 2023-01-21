/*
### 毫秒级别的渲染
*/

import { CountDown } from 'sard'

export default function () {
  return (
    <>
      <CountDown
        time={1000 * 60 * 60 * 2}
        format="HH 时 mm 分 ss 秒 SSS 毫秒"
        interval={93}
      />
    </>
  )
}
