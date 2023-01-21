/*
### 禁用状态
*/

import { Switch } from 'sard'

export default function () {
  return (
    <>
      <Switch defaultChecked disabled />
      <Switch disabled />
    </>
  )
}
