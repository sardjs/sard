/*
### 列顺序
*/

import { Row, Col } from 'sard'
import './Grid.css'

export default function () {
  return (
    <>
      <Row>
        <Col span={3}>
          <div className="grid-box">original-1</div>
        </Col>
        <Col span={3} order={-1}>
          <div className="grid-box">original-2 order:-1</div>
        </Col>
      </Row>
      <Row>
        <Col span={3} order={1}>
          <div className="grid-box">original-1 order:1</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">original-2</div>
        </Col>
      </Row>
      <Row>
        <Col span={3} order={2}>
          <div className="grid-box">original-1 order:2</div>
        </Col>
        <Col span={3} order={1}>
          <div className="grid-box">original-2 order:1</div>
        </Col>
        <Col span={3}>
          <div className="grid-box">original-3</div>
        </Col>
      </Row>
    </>
  )
}
