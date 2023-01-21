/*
### 图标大小
*/

import { Radio } from 'sard'

export default function () {
  return (
    <Radio.Group defaultValue="normal" size="2em">
      <Radio value="normal">正常</Radio>
      <Radio value="abnormal">异常</Radio>
    </Radio.Group>
  )
}
