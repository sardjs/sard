/*
### 方向
*/

import { Movable } from 'sard'

export default function () {
  const areaStyle = {
    display: 'inline-flex',
    width: '160px',
    height: '160px',
    margin: '20px',
    backgroundColor: '#eee',
  }
  const viewStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255, 165, 0, .3)',
  }

  return (
    <>
      <Movable.Area style={areaStyle}>
        <Movable.View style={viewStyle} direction="all">
          all
        </Movable.View>
      </Movable.Area>
      <Movable.Area style={areaStyle}>
        <Movable.View style={viewStyle} direction="horizontal">
          horizontal
        </Movable.View>
      </Movable.Area>
      <Movable.Area style={areaStyle}>
        <Movable.View style={viewStyle} direction="vertical">
          vertical
        </Movable.View>
      </Movable.Area>
      <Movable.Area style={areaStyle}>
        <Movable.View style={viewStyle} direction="none">
          none
        </Movable.View>
      </Movable.Area>
    </>
  )
}
