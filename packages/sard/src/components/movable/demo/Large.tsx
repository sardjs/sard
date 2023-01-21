/*
### movable-view 大于 movable-area
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
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255, 165, 0, .3)',
  }

  return (
    <>
      <Movable.Area style={areaStyle}>
        <Movable.View
          style={{
            ...viewStyle,
            width: '200px',
          }}
        ></Movable.View>
      </Movable.Area>
      <Movable.Area style={areaStyle}>
        <Movable.View
          style={{
            ...viewStyle,
            height: '200px',
          }}
        ></Movable.View>
      </Movable.Area>
      <Movable.Area style={areaStyle}>
        <Movable.View
          style={{
            ...viewStyle,
            width: '200px',
            height: '200px',
          }}
        ></Movable.View>
      </Movable.Area>
    </>
  )
}
