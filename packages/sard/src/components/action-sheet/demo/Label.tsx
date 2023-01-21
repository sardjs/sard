/*
### 描述信息
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
      label: '这是一个描述',
    },
    {
      title: '动作3',
    },
  ]

  const handleSelect = (item: ActionSheetItemProps, index: number) => {
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
      <ActionSheet
        visible={visible}
        itemList={itemList}
        cancel="取消"
        onSelect={handleSelect}
        onCancel={handleCancel}
      />
    </>
  )
}
