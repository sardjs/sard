/*
### 垂直步骤条
*/

import { Steps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [active, setActive] = useState(1)
  const handlePrevClick = () => {
    setActive((active) => (--active < 0 ? 3 : active))
  }
  const handleNextClick = () => {
    setActive((active) => (++active > 3 ? 0 : active))
  }

  return (
    <>
      <Steps direction="vertical" active={active}>
        <Steps.Step>
          <div>步骤1</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step>
          <div>步骤2</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step>
          <div>步骤3</div>
          <div>这是描述</div>
        </Steps.Step>
      </Steps>
      <Button onClick={handlePrevClick}>上一步</Button>{' '}
      <Button onClick={handleNextClick}>下一步</Button>
    </>
  )
}
