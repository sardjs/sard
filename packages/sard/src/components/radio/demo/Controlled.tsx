/*
### 受控
*/

import { Radio } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState('normal')

  const handleChange = (value: any) => {
    setValue(value)
  }

  return (
    <Radio.Group value={value} onChange={handleChange}>
      <Radio value="normal">正常</Radio>
      <Radio value="abnormal">异常</Radio>
    </Radio.Group>
  )
}
