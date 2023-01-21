import { Toast, ToastProps, ToastRef } from './index'
import { useAgent, AgentProps, IdAgentMap } from '../../utils/imperative'

export const idAgentMap: IdAgentMap<ToastProps, ToastRef> = {}

export const ToastAgent = (agentProps: AgentProps<ToastProps>) => {
  return useAgent<ToastProps, ToastRef>(Toast, agentProps, idAgentMap, 'toast')
}

export default ToastAgent
