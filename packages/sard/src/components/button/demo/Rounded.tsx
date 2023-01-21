/*
### 圆形按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <Button rounded type="primary">
        primary
      </Button>{' '}
      <Button rounded type="secondary">
        secondary
      </Button>{' '}
      <Button rounded type="mild">
        mild
      </Button>{' '}
      <Button rounded type="outlined">
        outlined
      </Button>{' '}
      <Button rounded type="text">
        text
      </Button>{' '}
      <Button rounded type="pale-text">
        pale-text
      </Button>{' '}
    </>
  )
}
