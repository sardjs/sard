/*
### 基础使用

使用 prefix 指定类名前缀，同时也是声明字体的类名；使用 name 指定要使用的图标；
前缀和名称会使用连字符拼接构成一个类名。如果前缀不是声明字体的类名，则可以使用 family 指定字体类名。
*/

import { Icon } from 'sard'

export default function () {
  return (
    <>
      <Icon prefix="si" name="search" />
    </>
  )
}
