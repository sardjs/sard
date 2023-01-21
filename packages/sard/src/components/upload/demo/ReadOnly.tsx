/*
### 只读
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps } from 'sard'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>(() => [
    {
      url: '/images/demo.jpeg',
    },
  ])

  return (
    <>
      <Upload previewList={list} readOnly />
    </>
  )
}
