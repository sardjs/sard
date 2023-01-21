/*
### 自定义步骤状态
*/

import { Steps, Tag } from 'sard'

export default function () {
  return (
    <>
      <Steps direction="vertical" lineColor="#ddd">
        <Steps.Step status="finish">
          <div>第1节</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step status="process">
          <div>第2节</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step status="finish">
          <div>第3节</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step status="finish">
          <div>第4节</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step status="process">
          <div>第5节</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step status="finish">
          <div>第6节</div>
          <div>这是描述</div>
        </Steps.Step>
        <Steps.Step status="wait">
          <div>第7节</div>
          <div>这是描述</div>
        </Steps.Step>
      </Steps>
    </>
  )
}
