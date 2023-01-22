/*
### 基础使用
*/

import {
  Form,
  Input,
  Button,
  Radio,
  Switch,
  Checkbox,
  Upload,
  Slider,
  Rate,
  Stepper,
  Popout,
  Cascader,
  Calendar,
  Icon,
  CascaderOption,
} from 'sard'
import area from '../../../assets/json/area.json'

export default function () {
  const handleSubmit = () => {
    void 0
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="用户名">
          <Input placeholder="请输入用户名" flush></Input>
        </Form.Item>

        <Form.Item label="密码" error="密码错误">
          <Input type="password" placeholder="请输入密码" flush></Input>
        </Form.Item>

        <Form.Item label="性别">
          <Radio.Group defaultValue="female">
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="是否已婚">
          <Switch />
        </Form.Item>

        <Form.Item label="兴趣爱好">
          <Checkbox.Group vertical defaultValue={['1', '2']}>
            <Checkbox value="1">运动</Checkbox>
            <Checkbox value="2">读书</Checkbox>
            <Checkbox value="3">旅行</Checkbox>
            <Checkbox value="4">游戏</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="头像上传">
          <Upload />
        </Form.Item>

        <Form.Item label="滑块">
          <Slider defaultValue={25} />
        </Form.Item>

        <Form.Item label="评分">
          <Rate defaultValue={3} />
        </Form.Item>

        <Form.Item label="步进器">
          <Stepper defaultValue={3} />
        </Form.Item>

        <Form.Item label="备注">
          <Input type="textarea" flush placeholder="请输入备注" />
        </Form.Item>

        <Form.Item label="省市区">
          <Popout title="请选择省市区">
            <Popout.Target
              select
              value
              clear
              format={(_, options: CascaderOption[]) =>
                options.map((option) => option.name).join('/')
              }
            >
              <Input
                readOnly
                flush
                placeholder="请选择省市区"
                append={
                  <Icon color="#ccc" fullName="bi-caret-right-fill"></Icon>
                }
              />
            </Popout.Target>
            <Popout.Bridge>
              <Cascader
                options={area}
                fieldNames={{ label: 'name', value: 'code' }}
              />
            </Popout.Bridge>
          </Popout>
        </Form.Item>

        <Form.Item label="出生日期">
          <Popout title="请选择出生日期">
            <Popout.Target select value clear>
              <Input
                readOnly
                flush
                placeholder="请选择出生日期"
                append={
                  <Icon color="#ccc" fullName="bi-caret-right-fill"></Icon>
                }
              />
            </Popout.Target>
            <Popout.Bridge>
              <Calendar />
            </Popout.Bridge>
          </Popout>
        </Form.Item>

        <div style={{ margin: 15 }}>
          <Button block>提交</Button>
        </div>
      </Form>
    </>
  )
}
