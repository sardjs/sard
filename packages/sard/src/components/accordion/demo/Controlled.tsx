/*
### 受控
*/

import { Accordion } from 'sard'
import { useState } from 'react'

export default function () {
  const [activeName, setActiveName] = useState(0)
  const handleChange = (name: any) => {
    setActiveName(name)
  }

  return (
    <>
      <Accordion activeName={activeName} onChange={handleChange}>
        <Accordion.Item title="标题1">内容1</Accordion.Item>
        <Accordion.Item title="标题2">内容2</Accordion.Item>
        <Accordion.Item title="标题3">内容3</Accordion.Item>
      </Accordion>
    </>
  )
}
