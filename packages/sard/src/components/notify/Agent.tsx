import { Notify, NotifyProps, NotifyRef } from './index'
import { useAgent, AgentProps, IdAgentMap } from '../../utils/imperative'

export const idAgentMap: IdAgentMap<NotifyProps, NotifyRef> = {}

export const NotifyAgent = (agentProps: AgentProps<NotifyProps>) => {
  return useAgent<NotifyProps, NotifyRef>(
    Notify,
    agentProps,
    idAgentMap,
    'notify',
  )
}

export default NotifyAgent
