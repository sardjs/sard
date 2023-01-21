/*
### 列间距
*/

import { Row, Col } from 'sard'
import './Grid.css'

export default function () {
  return (
    <>
      <Row gutter={30}>
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
