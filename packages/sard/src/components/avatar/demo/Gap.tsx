/*
### 间距
*/

import { Avatar } from 'sard'

export default function () {
  return (
    <>
      <Avatar.Group gap={-30}>
        <Avatar>头</Avatar>
        <Avatar>像</Avatar>
        <Avatar>组</Avatar>
      </Avatar.Group>
    </>
  )
}
