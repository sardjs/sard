/*
### 基础使用
*/

import { Swiper } from 'sard'
import './index.css'

export default function () {
  return (
    <>
      <Swiper className="demo-swiper" showDots>
        <Swiper.Item className="demo-swiper-item">item1</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item2</Swiper.Item>
        <Swiper.Item className="demo-swiper-item">item3</Swiper.Item>
      </Swiper>
    </>
  )
}
