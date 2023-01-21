/*
### 锁定方向

将初次手指触摸后移动方向固定，即初始判断为某个方向后，后面无论如何滑动，都不会触发另一方向，直到下一次滑动开始；
仅在设定水平或垂直方向的情况下有效。
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
        <Movable.View style={viewStyle} lockDirection direction="horizontal">
          horizontal
        </Movable.View>
      </Movable.Area>
      <Movable.Area style={areaStyle}>
        <Movable.View style={viewStyle} lockDirection direction="vertical">
          vertical
        </Movable.View>
      </Movable.Area>
    </>
  )
}
