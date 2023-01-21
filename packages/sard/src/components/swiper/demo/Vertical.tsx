/*
### 垂直
*/

import { Swiper } from 'sard'
import './index.css'

export default function () {
  return (
    <>
      <Swiper className="demo-swiper" showDots vertical>
        <Swiper.Item className="demo-swiper-item">item1</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item2</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item3</Swiper.Item>
      </Swiper>
    </>
  )
}
