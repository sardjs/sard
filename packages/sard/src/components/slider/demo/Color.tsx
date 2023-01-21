/*
### 自定义颜色
*/

import { Slider } from 'sard'

export default function () {
  return (
    <>
      <Slider
        defaultValue={50}
        pieceColor="orange"
        trackColor="rebeccapurple"
        thumbColor="pink"
      />
      <Slider
        defaultValue={[20, 80]}
        pieceColor="orange"
        trackColor="rebeccapurple"
        thumbColor="pink"
        range
      />
    </>
  )
}
