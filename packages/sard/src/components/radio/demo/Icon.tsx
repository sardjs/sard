/*
### 自定义icon
*/

import { Radio, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Radio.Group
      defaultValue="normal"
      icon={(checked) => (
        <Icon
          fullName={checked ? 'bi-patch-check-fill' : 'bi-patch-check'}
        ></Icon>
      )}
    >
      <Radio value="normal">正常</Radio>
      <Radio value="abnormal">异常</Radio>
    </Radio.Group>
  )
}
