/*
### 禁用
*/

import { Upload } from 'sard'

export default function () {
  return (
    <>
      <Upload
        previewList={[
          {
            url: '/images/demo.jpeg',
          },
        ]}
        disabled
      />
    </>
  )
}
