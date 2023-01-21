/*
### 不同状态的值
*/

import { Switch } from 'sard'
import { useState } from 'react'

export default function () {
  const [checked, setChecked] = useState(true)
  const [value, setValue] = useState('on')
  return (
    <>
      <Switch
        checked={checked}
        onChange={(e, v) => (setChecked(e), setValue(v))}
        checkedValue="on"
        uncheckedValue="off"
      />
      <div>{value}</div>
    </>
  )
}
