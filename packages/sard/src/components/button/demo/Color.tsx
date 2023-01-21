/*
### 自定义颜色
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <Button style={{ color: 'rebeccapurple' }} type="primary">
        primary
      </Button>{' '}
      <Button style={{ color: 'rebeccapurple' }} type="secondary">
        secondary
      </Button>{' '}
      <Button style={{ color: 'rebeccapurple' }} type="mild">
        mild
      </Button>{' '}
      <Button style={{ color: 'rebeccapurple' }} type="outlined">
        outlined
      </Button>{' '}
      <Button style={{ color: 'rebeccapurple' }} type="text">
        text
      </Button>{' '}
      <Button style={{ color: 'rebeccapurple' }} type="pale-text">
        pale-text
      </Button>{' '}
    </>
  )
}
