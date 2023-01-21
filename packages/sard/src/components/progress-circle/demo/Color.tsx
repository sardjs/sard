/*
### 颜色
*/

import { ProgressCircle } from 'sard'

export default function () {
  return (
    <>
      <ProgressCircle percent={50} trackColor="rebeccapurple" color="orange">
        50%
      </ProgressCircle>
    </>
  )
}
