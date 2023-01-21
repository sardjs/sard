/*
### 居中
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
      <Steps active={active} center>
        <Steps.Step>步骤1</Steps.Step>
        <Steps.Step>步骤2</Steps.Step>
        <Steps.Step>步骤3</Steps.Step>
      </Steps>
      <Button onClick={handlePrevClick}>上一步</Button>{' '}
      <Button onClick={handleNextClick}>下一步</Button>
    </>
  )
}
