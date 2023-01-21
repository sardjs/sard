/*
### 基础使用
*/

import { Pagination } from 'sard'

export default function () {
  return (
    <>
      <Pagination total={100} pageSize={10} />
    </>
  )
}
