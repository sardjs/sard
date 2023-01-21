/*
### 基础使用
*/

import { ImagePreview, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>图片预览</Button>
      <ImagePreview
        visible={visible}
        onVisible={setVisible}
        images={[
          '/images/one-piece1.jpg',
          '/images/one-piece2.jpg',
          '/images/one-piece3.jpg',
          '/images/one-piece4.jpg',
          '/images/one-piece5.jpg',
        ]}
      />
    </>
  )
}
