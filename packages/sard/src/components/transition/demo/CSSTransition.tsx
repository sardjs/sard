/*
### CSSTransition
*/

import { CSSTransition, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(true)

  const handleClick = () => {
    setVisible((visible) => !visible)
  }

  return (
    <>
      <Button onClick={handleClick}>Toggle</Button>

      <CSSTransition in={visible} timeout={2000}>
        <section
          className="aaa"
          style={{
            width: 100,
            height: 100,
            background: 'orange',
            transitionDuration: '2s',
          }}
        ></section>
      </CSSTransition>
    </>
  )
}
