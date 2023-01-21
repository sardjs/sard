/*
### 基础使用
*/

import { Row, Col } from 'sard'
import './Grid.css'

export default function () {
  return (
    <>
      <Row>
        <Col>
          <div className="grid-box">span</div>
        </Col>
        <Col>
          <div className="grid-box">span</div>
        </Col>
        <Col>
          <div className="grid-box">span</div>
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={4}>
          <div className="grid-box">span-4</div>
        </Col>
        <Col span={5}>
          <div className="grid-box">span-5</div>
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col>
          <div className="grid-box">span</div>
        </Col>
        <Col span={4}>
          <div className="grid-box">span-4</div>
        </Col>
      </Row>
      <Row>
        <Col span="auto">
          <div className="grid-box">auto</div>
        </Col>
        <Col>
          <div className="grid-box">span</div>
        </Col>
        <Col>
          <div className="grid-box">span</div>
        </Col>
      </Row>
    </>
  )
}
