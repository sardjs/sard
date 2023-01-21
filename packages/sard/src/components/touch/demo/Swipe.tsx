/*
### Swipe
*/

import { useState } from 'react'
import { useStrike } from 'sard'
import './index.css'

export default function () {
  const [msg, setMsg] = useState<any>(null)

  const binding = useStrike(
    (strike) => {
      ;['swipeup', 'swiperight', 'swipedown', 'swipeleft'].forEach((type) => {
        strike.on(type, (event: any) => {
          console.log(event.type)

          setMsg(
            <>
              <div>type: {event.type}</div>
              <div>clientX: {event.x}</div>
              <div>clientY: {event.y}</div>
            </>,
          )
        })
      })
    },
    {
      swipe: true,
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
