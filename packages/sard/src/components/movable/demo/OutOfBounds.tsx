/*
### 超出边界
*/

import { Movable, Stepper } from 'sard'
import { useState } from 'react'

export default function () {
  const [damping, setDamping] = useState(10)
  const [reboundDuration, setreboundDuration] = useState(300)
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
      <div>
        <label>设置阻尼系数：</label>
        <Stepper
          value={damping}
          onChange={(value) => setDamping(value || 0)}
        ></Stepper>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>设置回弹时间：</label>
        <Stepper
          value={reboundDuration}
          onChange={(value) => setreboundDuration(value || 0)}
        ></Stepper>
      </div>

      <Movable.Area style={areaStyle}>
        <Movable.View
          style={viewStyle}
          outOfBounds
          damping={damping}
          reboundDuration={reboundDuration}
        ></Movable.View>
      </Movable.Area>

      <Movable.Area style={areaStyle}>
        <Movable.View
          style={{
            ...viewStyle,
            width: '200px',
          }}
          outOfBounds
          damping={damping}
          reboundDuration={reboundDuration}
        ></Movable.View>
      </Movable.Area>

      <Movable.Area style={areaStyle}>
        <Movable.View
          style={{
            ...viewStyle,
            height: '200px',
          }}
          outOfBounds
          damping={damping}
          reboundDuration={reboundDuration}
        ></Movable.View>
      </Movable.Area>

      <Movable.Area style={areaStyle}>
        <Movable.View
          style={{
            ...viewStyle,
            width: '200px',
            height: '200px',
          }}
          outOfBounds
          damping={damping}
          reboundDuration={reboundDuration}
        ></Movable.View>
      </Movable.Area>
    </>
  )
}
