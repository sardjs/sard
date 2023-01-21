/*
### 条纹进度条
*/

import { ProgressBar } from 'sard'

export default function () {
  return (
    <>
      <ProgressBar percent={50} striped thickness="10px" />
      <br />
      <ProgressBar percent={50} striped thickness="10px" animated />
    </>
  )
}
