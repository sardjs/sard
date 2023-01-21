/*
### 自动播放
*/

import { useState } from 'react'
import { Swiper, Slider } from 'sard'
import './index.css'

export default function () {
  const [interval, setInterval$] = useState(2000)
  const [duration, setDuration] = useState(500)

  return (
    <>
      <div>
        <label>duration: {duration}</label>
        <Slider
          min={500}
          max={2000}
          value={duration}
          onChange={(value: number) => setDuration(value)}
        />
      </div>
      <div style={{ marginBottom: 5 }}>
        <label>interval: {interval}</label>
        <Slider
          min={2000}
          max={8000}
          value={interval}
          onChange={(value: number) => setInterval$(value)}
        />
      </div>
      <Swiper
        className="demo-swiper"
        autoplay
        duration={duration}
        interval={interval}
        showDots
      >
        <Swiper.Item className="demo-swiper-item">item1</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item2</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item3</Swiper.Item>
      </Swiper>
    </>
  )
}
