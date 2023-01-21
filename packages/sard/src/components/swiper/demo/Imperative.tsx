/*
### 命令
*/

import { useRef, useState } from 'react'
import { Swiper, SwiperRef, Button, Input } from 'sard'
import './index.css'

export default function () {
  const swiperRef = useRef<SwiperRef>(null)

  const handlePrev = () => {
    swiperRef.current?.prev()
  }
  const handleNext = () => {
    swiperRef.current?.next()
  }

  const [index, setIndex] = useState<number>(0)

  const handleSwipeTo = () => {
    swiperRef.current?.swipeTo(index || 0)
  }
  const handleChange = (index: number) => {
    setIndex(index)
  }

  return (
    <>
      <div style={{ marginBottom: 5 }}>
        <Button onClick={handlePrev}>prev</Button>{' '}
        <Button onClick={handleNext}>next</Button>{' '}
        <Input
          style={{ display: 'inline-flex', verticalAlign: 'middle', width: 70 }}
          type="number"
          value={index}
          onChange={(value) => setIndex(+value)}
        />{' '}
        <Button onClick={handleSwipeTo}>swipeTo</Button>
      </div>

      <Swiper
        ref={swiperRef}
        showDots
        className="demo-swiper"
        onChange={handleChange}
      >
        <Swiper.Item className="demo-swiper-item">item1</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item2</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item3</Swiper.Item>
      </Swiper>
    </>
  )
}
