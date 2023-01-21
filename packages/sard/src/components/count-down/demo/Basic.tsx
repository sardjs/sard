/*
### 基础使用
*/

import { CountDown } from 'sard'

export default function () {
  return (
    <>
      <CountDown time={1000 * 60 * 60 * 2} />
    </>
  )
}
