/*
### 加载状态
*/

import { Switch } from 'sard'

export default function () {
  return (
    <>
      <Switch loading />
      <Switch defaultChecked loading />
    </>
  )
}
