/*
### 卡片标签
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs
        type="card"
        style={{ padding: 10, background: '#eee' }}
        bodyStyle={{ background: '#fff' }}
      >
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>
    </>
  )
}
