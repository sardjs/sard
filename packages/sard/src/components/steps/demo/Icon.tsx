/*
### 自定义图标
*/

import { Steps, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <>
      <Steps active={1}>
        <Steps.Step icon={<Icon size={20} fullName="bi-person-circle"></Icon>}>
          填写账号
        </Steps.Step>
        <Steps.Step
          icon={<Icon size={20} fullName="bi-person-bounding-box"></Icon>}
        >
          验证身份
        </Steps.Step>
        <Steps.Step icon={<Icon size={20} fullName="bi-key-fill"></Icon>}>
          设置密码
        </Steps.Step>
        <Steps.Step
          icon={<Icon size={20} fullName="bi-person-check-fill"></Icon>}
        >
          注册成功
        </Steps.Step>
      </Steps>
    </>
  )
}
