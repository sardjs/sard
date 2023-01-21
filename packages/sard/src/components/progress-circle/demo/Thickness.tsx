/*
### 粗细

相对于当前圆环尺寸的百分比
*/

import { ProgressCircle } from 'sard'

export default function () {
  return (
    <>
      <ProgressCircle percent={50} thickness={10}>
        50%
      </ProgressCircle>
    </>
  )
}
