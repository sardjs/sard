/*
### Transition
*/

import { Transition, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible((visible) => !visible)
  }

  return (
    <>
      <Button onClick={handleClick}>Toggle</Button>
      <Transition in={visible} timeout={1000} mountOnEnter unmountOnExit>
        {(status) => (
          <div style={{ width: 100, height: 100, background: 'orange' }}>
            {status}
          </div>
        )}
      </Transition>
    </>
  )
}
