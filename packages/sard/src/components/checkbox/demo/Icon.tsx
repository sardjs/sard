/*
### 自定义icon
*/

import { Checkbox, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Checkbox
      icon={(checked) => (
        <Icon
          fullName={checked ? 'bi-patch-check-fill' : 'bi-patch-check'}
        ></Icon>
      )}
    >
      复选框
    </Checkbox>
  )
}
