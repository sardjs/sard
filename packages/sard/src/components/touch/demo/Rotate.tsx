/*
### Rotate
*/

import { useState } from 'react'
import { useStrike } from 'sard'
import './index.css'

export default function () {
  const [msg, setMsg] = useState<any>(null)

  const binding = useStrike(
    (strike) => {
      ;['rotatestart', 'rotatemove', 'rotateend'].forEach((type) => {
        strike.on(type, (event: any) => {
          console.log(event.type)

          setMsg(
            <>
              <div>type: {event.type}</div>
              <div>degrees: {event.degrees}</div>
            </>,
          )
        })
      })
    },
    {
      rotate: true,
    },
  )

  return (
    <>
      <div
        {...binding}
        className="demo-touch-box"
        style={{ touchAction: 'none' }}
      ></div>
      <div>{msg}</div>
    </>
  )
}
