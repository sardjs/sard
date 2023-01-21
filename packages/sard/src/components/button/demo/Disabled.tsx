/*
### 禁用按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <Button disabled type="primary">
        primary
      </Button>{' '}
      <Button disabled type="secondary">
        secondary
      </Button>{' '}
      <Button disabled type="mild">
        mild
      </Button>{' '}
      <Button disabled type="outlined">
        outlined
      </Button>{' '}
      <Button disabled type="text">
        text
      </Button>{' '}
      <Button disabled type="pale-text">
        pale-text
      </Button>{' '}
    </>
  )
}
