/*
### 轮廓线按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <Button type="outlined" theme="primary">
        primary
      </Button>{' '}
      <Button type="outlined" theme="secondary">
        secondary
      </Button>{' '}
      <Button type="outlined" theme="success">
        success
      </Button>{' '}
      <Button type="outlined" theme="info">
        info
      </Button>{' '}
      <Button type="outlined" theme="warning">
        warning
      </Button>{' '}
      <Button type="outlined" theme="danger">
        danger
      </Button>{' '}
      <Button type="outlined" theme="dark">
        dark
      </Button>{' '}
    </>
  )
}
