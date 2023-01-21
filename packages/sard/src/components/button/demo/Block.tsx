/*
### 块级按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <Button block style={{ marginBottom: 10 }} type="primary">
        primary
      </Button>{' '}
      <Button block style={{ marginBottom: 10 }} type="secondary">
        secondary
      </Button>{' '}
      <Button block style={{ marginBottom: 10 }} type="mild">
        mild
      </Button>{' '}
      <Button block style={{ marginBottom: 10 }} type="outlined">
        outlined
      </Button>{' '}
      <Button block style={{ marginBottom: 10 }} type="text">
        text
      </Button>{' '}
      <Button block style={{ marginBottom: 10 }} type="pale-text">
        pale-text
      </Button>{' '}
    </>
  )
}
