/*
### 简单分页
*/

import { Pagination } from 'sard'

export default function () {
  return (
    <>
      <Pagination total={43} pageSize={10} type="simple" />
    </>
  )
}
