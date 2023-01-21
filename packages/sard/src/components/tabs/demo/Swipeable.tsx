/*
### 滑动切换
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs swipeable>
        <TabPane label="标签1" style={{ padding: 30 }}>
          内容1
        </TabPane>
        <TabPane label="标签2" style={{ padding: 30 }}>
          内容2
        </TabPane>
        <TabPane label="标签3" style={{ padding: 30 }}>
          内容3
        </TabPane>
      </Tabs>
    </>
  )
}
