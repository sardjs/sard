/*
### 自定义按钮插槽
*/

import { Slider } from 'sard'

export default function () {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '20px',
    borderRadius: '4px',
    color: '#fff',
  }
  const startStyle = {
    ...buttonStyle,
    backgroundColor: 'orange',
  }
  const endStyle = {
    ...buttonStyle,
    backgroundColor: 'rebeccapurple',
  }

  const startButton = (value: number) => <div style={startStyle}>{value}</div>
  const endButton = (value: number) => <div style={endStyle}>{value}</div>

  return (
    <>
      <Slider defaultValue={50} end={endButton} />
      <Slider
        defaultValue={[20, 80]}
        start={startButton}
        end={endButton}
        range
      />
    </>
  )
}
