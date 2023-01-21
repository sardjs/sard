/*
### 限定上传数量
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps, UploadFileItem } from 'sard'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>([])

  const handleChange = (previewList: UploadPreviewProps[]) => {
    setList(previewList)
  }

  const handleAfterRead = (fileItem: UploadFileItem) => {
    fileItem.status = 'uploading'
    fileItem.message = '正在上传'
    setList((list) => [...list])

    setTimeout(() => {
      fileItem.status = 'done'
      setList((list) => [...list])
    }, 1500)
  }

  return (
    <>
      <Upload
        previewList={list}
        onChange={handleChange}
        afterRead={handleAfterRead}
        maxCount={1}
      />
    </>
  )
}
