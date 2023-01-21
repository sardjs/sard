/*
### 名称匹配

可以使用 name 唯一标识当前 pane，默认 name 为当前 pane 在DOM中的位置下标。
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs>
        <TabPane name="name1" label="标签1">
          内容1
        </TabPane>
        <TabPane name="name2" label="标签2">
          内容2
        </TabPane>
        <TabPane name="name3" label="标签3">
          内容3
        </TabPane>
      </Tabs>
    </>
  )
}
