/*
### 命令式
*/

import { Notify, Button } from 'sard'

export default function () {
  return (
    <>
      <Button
        onClick={() =>
          Notify.show({
            type: 'info',
            message: '这是一条通知',
          })
        }
      >
        显示通知
      </Button>{' '}
      <Button onClick={() => Notify.success('这是一条通知')}>
        显示成功通知
      </Button>{' '}
      <Button
        onClick={() =>
          Notify.warning('这是一条通知', {
            duration: 3000,
          })
        }
      >
        显示警告通知
      </Button>{' '}
      <Button
        onClick={() =>
          Notify.error({
            message: '这是一条通知',
            duration: 0,
          })
        }
      >
        显示不会自动隐藏的通知
      </Button>{' '}
      <Button onClick={() => Notify.hide()}>隐藏通知</Button>
    </>
  )
}
