import { ImagePreview, ImagePreviewProps, ImagePreviewRef } from './index'
import { useAgent, AgentProps, IdAgentMap } from '../../utils/imperative'

export const idAgentMap: IdAgentMap<ImagePreviewProps, ImagePreviewRef> = {}

export const ImagePreviewAgent = (
  agentProps: AgentProps<ImagePreviewProps>,
) => {
  return useAgent<ImagePreviewProps, ImagePreviewRef>(
    ImagePreview,
    agentProps,
    idAgentMap,
    'image-preview',
  )
}

export default ImagePreviewAgent
