/*
### 复选框组

复选框组用于收集选中状态的复选框值
*/

import { Checkbox } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState(['apple'])
  return (
    <>
      <div>
        <Checkbox.Group value={value} onChange={setValue}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="banana">香蕉</Checkbox>
        </Checkbox.Group>
        {JSON.stringify(value)}
      </div>

      <div style={{ marginTop: 20 }}>
        <div>垂直：</div>
        <Checkbox.Group vertical value={value} onChange={setValue}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="banana">香蕉</Checkbox>
        </Checkbox.Group>
      </div>
    </>
  )
}
