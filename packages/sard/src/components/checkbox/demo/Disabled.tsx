/*
### 禁用状态
*/

import { Checkbox } from 'sard'

export default function () {
  return (
    <>
      <Checkbox disabled checked style={{ marginRight: 10 }}>
        复选框
      </Checkbox>
      <Checkbox disabled>复选框</Checkbox>
    </>
  )
}
