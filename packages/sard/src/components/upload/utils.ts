import { UploadPreviewProps } from './Preview'
import { isImageUrl } from '../../utils'

export const isImageFile = ({
  isImage,
  file,
  url,
  content,
}: UploadPreviewProps) => {
  return (
    isImage ||
    (file && file.type.indexOf('image') === 0) ||
    (url && isImageUrl(url)) ||
    (typeof content === 'string' && content.indexOf('data:image') === 0)
  )
}
