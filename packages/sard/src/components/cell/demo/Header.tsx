/*
### 自定义头部
*/

import { Cell, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Cell.Group>
        <Cell
          title="标题"
          value="值"
          header={<Icon fullName="bi-1-circle" size="120%" />}
        ></Cell>
        <Cell
          title="标题"
          value="值"
          header={<Icon fullName="bi-2-circle" size="120%" />}
        ></Cell>
        <Cell
          title="标题"
          value="值"
          header={<Icon fullName="bi-3-circle" size="120%" />}
        ></Cell>
      </Cell.Group>
    </>
  )
}
