/*
### 列偏移
*/

import { Row, Col } from 'sard'
import './Grid.css'

export default function () {
  return (
    <>
      <Row>
        <Col span={3}>
          <div className="grid-box">span-3</div>
        </Col>
        <Col span={3} offset={3}>
          <div className="grid-box">span-3 offset-3</div>
        </Col>
      </Row>
      <Row>
        <Col span={3} offset={3}>
          <div className="grid-box">span-3 offset-3</div>
        </Col>
        <Col span={3} offset={3}>
          <div className="grid-box">span-3 offset-3</div>
        </Col>
      </Row>
      <Row>
        <Col offset={3}>
          <div className="grid-box">span offset-3</div>
        </Col>
      </Row>
    </>
  )
}
