/*
### 代理

代理组件用于小程序。通过预先放置带有id属性的组件，以便可以通过命令式进行使用。
*/

import { Toast, Button } from 'sard'

export default function () {
  return (
    <>
      <Button onClick={() => Toast.text('文本提示')}>文本提示</Button>{' '}
      <Button onClick={() => Toast.success('成功')}>成功提示</Button>{' '}
      <Button
        onClick={() =>
          Toast.fail('失败', {
            onTimeout() {
              console.log('onTimeout')
            },
          })
        }
      >
        失败提示
      </Button>{' '}
      <Button onClick={() => Toast.loading('加载中')}>加载中提示</Button>{' '}
      <Button onClick={() => Toast.hide()}>隐藏提示</Button>
      <Toast.Agent />
    </>
  )
}
