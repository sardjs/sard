/*
### 次要类型按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <Button type="secondary" theme="primary">
        primary
      </Button>{' '}
      <Button type="secondary" theme="secondary">
        secondary
      </Button>{' '}
      <Button type="secondary" theme="success">
        success
      </Button>{' '}
      <Button type="secondary" theme="info">
        info
      </Button>{' '}
      <Button type="secondary" theme="warning">
        warning
      </Button>{' '}
      <Button type="secondary" theme="danger">
        danger
      </Button>{' '}
      <Button type="secondary" theme="dark">
        dark
      </Button>{' '}
    </>
  )
}
