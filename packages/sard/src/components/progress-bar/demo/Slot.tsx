/*
### 插槽
*/

import { ProgressBar } from 'sard'

export default function () {
  return (
    <>
      <ProgressBar percent={50} thickness="16px">
        50%
      </ProgressBar>
    </>
  )
}
