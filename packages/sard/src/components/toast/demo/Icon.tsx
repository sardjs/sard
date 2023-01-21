/*
### 自定义 icon
*/

import { Toast, Icon, Button } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Button
        onClick={() =>
          Toast.show('休息一下', {
            icon: <Icon fullName="bi-cup-hot"></Icon>,
          })
        }
      >
        显示提示框
      </Button>
    </>
  )
}
