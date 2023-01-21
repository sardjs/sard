/*
### 范围选择
*/

import { Slider } from 'sard'
import { useState } from 'react'

export default function () {
  const [value, setValue] = useState([0, 50] as [number, number])
  const handleChanging = (value: [number, number]) => {
    setValue(value)
  }
  return (
    <>
      <Slider defaultValue={value} range onChange={handleChanging} />
      {value.join(',')}
    </>
  )
}
