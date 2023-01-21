/*
### 基础使用
*/

import { Movable } from 'sard'

export default function () {
  const areaStyle = {
    width: '160px',
    height: '160px',
    backgroundColor: '#eee',
  }
  const viewStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255, 165, 0, .3)',
  }

  return (
    <Movable.Area style={areaStyle}>
      <Movable.View style={viewStyle}></Movable.View>
    </Movable.Area>
  )
}
