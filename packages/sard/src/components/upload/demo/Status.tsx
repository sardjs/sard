/*
### 上传状态
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps } from 'sard'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>(() => [
    {
      url: '/images/demo.jpeg',
    },
    {
      url: '/images/demo.jpeg',
      status: 'uploading',
      message: '正在上传',
    },
    {
      url: '/images/demo.jpeg',
      status: 'failed',
      message: '上传失败',
    },
  ])

  const handleChange = (previewList: UploadPreviewProps[]) => {
    setList(previewList)
  }

  const handleAfterRead = (fileItem: UploadPreviewProps) => {
    fileItem.status = 'uploading'
    fileItem.message = '正在上传'
    setList((list) => [...list])

    setTimeout(() => {
      fileItem.status = 'failed'
      fileItem.message = '上传失败'
      setList((list) => [...list])
    }, 1500)
  }

  return (
    <>
      <Upload
        previewList={list}
        onChange={handleChange}
        afterRead={handleAfterRead}
      />
    </>
  )
}
