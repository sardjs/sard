/*
### 类型
*/

import { Input } from 'sard'
import { useState } from 'react'

export default function () {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')
  const [value5, setValue5] = useState('')
  const [value6, setValue6] = useState('')
  const [value7, setValue7] = useState('')

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <Input
        value={value1}
        onChange={(e) => setValue1(e)}
        placeholder="文本"
        type="text"
      />
      <Input
        value={value2}
        onChange={(e) => setValue2(e)}
        placeholder="数字"
        type="number"
      />
      <Input
        value={value3}
        onChange={(e) => setValue3(e)}
        placeholder="身份证"
        type="idcard"
      />
      <Input
        value={value4}
        onChange={(e) => setValue4(e)}
        placeholder="带小数点的数字"
        type="digit"
      />
      <Input
        value={value5}
        onChange={(e) => setValue5(e)}
        placeholder="电话"
        type="tel"
      />
      <Input
        value={value6}
        onChange={(e) => setValue6(e)}
        placeholder="密码"
        type="password"
      />
      <Input
        value={value7}
        onChange={(e) => setValue7(e)}
        placeholder="文本域"
        type="textarea"
      />
    </div>
  )
}
