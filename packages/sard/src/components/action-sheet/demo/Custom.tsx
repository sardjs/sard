/*
### 自定义内容
*/

import { ActionSheet, ActionSheetItemProps, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  const itemList = [
    {
      title: '动作1',
    },
    {
      title: '动作2',
    },
    {
      title: '动作3',
    },
  ]

  const handleItemClick = (item: ActionSheetItemProps, index: number) => {
    setVisible(false)
    console.log(item, index)
  }

  const handleCancel = () => {
    setVisible(false)
    console.log('cancel')
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示动作面板</Button>
      <ActionSheet cancel="取消" visible={visible} onCancel={handleCancel}>
        {itemList.map((item, index) => (
          <ActionSheet.Item
            key={index}
            title={item.title}
            onClick={() => handleItemClick(item, index)}
          />
        ))}
        <ActionSheet.Item>
          <div>自定义内容</div>
        </ActionSheet.Item>
      </ActionSheet>
    </>
  )
}
