/*
### 垂直
*/

import { Slider } from 'sard'

export default function () {
  return (
    <>
      <div style={{ height: '200px' }}>
        <Slider defaultValue={50} vertical />
        <Slider defaultValue={[20, 80]} vertical range />
      </div>
    </>
  )
}
