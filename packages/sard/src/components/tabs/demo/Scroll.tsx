/*
### 可滚动的标签栏

当标签数大于 scrollCount，标签父元素溢出时可以横向滚动。
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs>
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
        <TabPane label="标签4">内容4</TabPane>
        <TabPane label="标签5">内容5</TabPane>
        <TabPane label="标签6">内容6</TabPane>
        <TabPane label="标签7">内容7</TabPane>
      </Tabs>
    </>
  )
}
