/*
### 折叠时间
*/

import { Accordion } from 'sard'

export default function () {
  return (
    <>
      <Accordion duration={600}>
        <Accordion.Item title="标题1">内容1</Accordion.Item>
        <Accordion.Item title="标题2">内容2</Accordion.Item>
        <Accordion.Item title="标题3-时间为0" duration={0}>
          内容3
        </Accordion.Item>
      </Accordion>
    </>
  )
}
