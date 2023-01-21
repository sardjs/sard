import { Dialog, DialogProps, DialogRef } from './index'
import { useAgent, AgentProps, IdAgentMap } from '../../utils/imperative'

export const idAgentMap: IdAgentMap<DialogProps, DialogRef> = {}

export const DialogAgent = (agentProps: AgentProps<DialogProps>) => {
  return useAgent<DialogProps, DialogRef>(
    Dialog,
    agentProps,
    idAgentMap,
    'dialog',
  )
}

export default DialogAgent
