/*
### 自定义尺寸
*/

import { Slider } from 'sard'

export default function () {
  return (
    <>
      <Slider defaultValue={50} thumbSize="15px" trackSize="5px" />
      <Slider defaultValue={[20, 80]} thumbSize="15px" trackSize="5px" range />
    </>
  )
}
