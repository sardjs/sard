/*
### 自定义icon
*/

import { Cell, Switch, Icon } from 'sard'

export default function () {
  return (
    <>
      <Cell
        isLink
        title="标题"
        value="值"
        icon={<Icon prefix="si" name="down" />}
      />
      <Cell title="标题" icon={<Switch />} />
      <Cell
        title="标题"
        icon={<Icon fullName="bi-check-lg" size={20} color="#4694d1" />}
      />
    </>
  )
}
