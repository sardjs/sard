/*
### 水平对齐
*/

import { Row, Col } from 'sard'
import './Grid.css'

export default function () {
  return (
    <>
      <Row justify="start">
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
      </Row>
      <Row justify="end">
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
      </Row>
    </>
  )
}
