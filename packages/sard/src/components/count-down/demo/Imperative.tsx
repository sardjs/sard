/*
### 手动控制
*/

import { CountDown, CountDownRef, Button } from 'sard'
import { useRef } from 'react'

export default function () {
  const ref = useRef<CountDownRef>(null)

  return (
    <>
      <Button onClick={() => ref.current?.start()}>开始</Button>{' '}
      <Button onClick={() => ref.current?.pause()}>暂停</Button>{' '}
      <Button onClick={() => ref.current?.reset()}>重置</Button>
      <CountDown
        ref={ref}
        time={1000 * 10}
        format="ss:SSS"
        interval={60}
        autoStart={false}
      />
    </>
  )
}
