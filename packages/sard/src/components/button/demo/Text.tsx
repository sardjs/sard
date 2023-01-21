/*
### 文本按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <Button type="text" theme="primary">
        primary
      </Button>{' '}
      <Button type="text" theme="secondary">
        secondary
      </Button>{' '}
      <Button type="text" theme="success">
        success
      </Button>{' '}
      <Button type="text" theme="info">
        info
      </Button>{' '}
      <Button type="text" theme="warning">
        warning
      </Button>{' '}
      <Button type="text" theme="danger">
        danger
      </Button>{' '}
      <Button type="text" theme="dark">
        dark
      </Button>{' '}
    </>
  )
}
