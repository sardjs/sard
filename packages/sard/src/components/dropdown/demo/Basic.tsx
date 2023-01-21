/*
### 基础使用
*/

import { Dropdown } from 'sard'

export default function () {
  const options1 = [
    {
      label: '分类1',
      value: 'f1',
    },
    {
      label: '分类2',
      value: 'f2',
    },
  ]
  const options2 = [
    {
      label: '型号1',
      value: 'x1',
    },
    {
      label: '型号2',
      value: 'x2',
    },
  ]

  return (
    <>
      <Dropdown>
        <Dropdown.Item options={options1} defaultValue="f1">
          分类
        </Dropdown.Item>
        <Dropdown.Item options={options2} defaultValue="x2">
          型号
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}
