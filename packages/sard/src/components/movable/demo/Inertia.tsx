/*
### 惯性
*/

import { Movable } from 'sard'

export default function () {
  const areaStyle = {
    width: '640px',
    height: '320px',
    backgroundColor: '#eee',
  }
  const viewStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255, 165, 0, .3)',
  }

  return (
    <Movable.Area style={areaStyle}>
      <Movable.View style={viewStyle} inertia outOfBounds></Movable.View>
    </Movable.Area>
  )
}
