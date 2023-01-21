/*
### 完整类名

如果图标没有统一的前缀，或者不需要前缀和 family 来声明字体，可以使用 fullName 来只添加一个类名。
例如 bootstrap-icons 。
*/

import { Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Icon fullName="bi-cup-hot" />
    </>
  )
}
