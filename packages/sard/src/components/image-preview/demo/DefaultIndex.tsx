/*
### 默认下标
*/

import { ImagePreview, Button } from 'sard'

export default function () {
  const handleClick = () => {
    ImagePreview.show({
      images: [
        '/images/one-piece1.jpg',
        '/images/one-piece2.jpg',
        '/images/one-piece3.jpg',
        '/images/one-piece4.jpg',
        '/images/one-piece5.jpg',
      ],
      defaultIndex: 2,
    })
  }

  return (
    <>
      <Button onClick={handleClick}>图片预览</Button>
    </>
  )
}
