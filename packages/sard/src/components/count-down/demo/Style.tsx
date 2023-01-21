/*
### 自定义样式
*/

import { CountDown, CurrentTime } from 'sard'

export default function () {
  return (
    <>
      <style>
        {`
          .time-wrap {
            display: flex;
            align-items: center;
          }
          .time {
            padding: 5px;
            background: orange;
            border-radius: 4px;
            color: #000;
          }
          .colon {
            margin: 0 5px;
          }
        `}
      </style>
      <CountDown
        time={1000 * 60 * 60 * 2}
        format="HH 时 mm 分 ss 秒"
        interval={93}
      >
        {(time: CurrentTime) => (
          <div className="time-wrap">
            <div className="time">{time.hours}</div>
            <div className="colon">:</div>
            <div className="time">{time.minutes}</div>
            <div className="colon">:</div>
            <div className="time">{time.seconds}</div>
          </div>
        )}
      </CountDown>
    </>
  )
}
