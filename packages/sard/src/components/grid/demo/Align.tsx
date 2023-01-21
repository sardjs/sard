/*
### 垂直对齐
*/

import { Row, Col } from 'sard'
import './Grid.css'

export default function () {
  return (
    <div className="grid-align">
      <Row align="start">
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
      <Row align="center">
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
      <Row align="end">
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
    </div>
  )
}
