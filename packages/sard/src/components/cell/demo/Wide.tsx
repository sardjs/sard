/*
### 头部宽间距
*/

import { Cell, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Cell.Group wide>
        <Cell
          title="标题"
          value="值"
          header={
            <Icon fullName="bi-1-circle" type="rounded" frameColor="#ff4747" />
          }
        ></Cell>
        <Cell
          title="标题"
          value="值"
          header={
            <Icon fullName="bi-2-circle" type="rounded" frameColor="#40e23c" />
          }
        ></Cell>
        <Cell
          title="标题"
          value="值"
          header={
            <Icon fullName="bi-3-circle" type="rounded" frameColor="#4694d1" />
          }
        ></Cell>
      </Cell.Group>
    </>
  )
}
