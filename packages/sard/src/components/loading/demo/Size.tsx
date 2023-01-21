/*
### 加载尺寸
*/

import { Loading } from 'sard'

export default function () {
  return (
    <>
      <Loading /> <Loading size="24px" /> <Loading type="clock" />{' '}
      <Loading type="clock" size="24px" />
    </>
  )
}
