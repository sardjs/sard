/*
### 额外内容
*/

import { Avatar, Badge } from 'sard'

export default function () {
  return (
    <>
      <div>
        <Avatar shape="square" extra={<Badge fixed value={5}></Badge>}></Avatar>
      </div>
      <br />
      <div>
        <Avatar
          extra={
            <Badge
              fixed
              value={5}
              style={{ top: '14.6447%', right: '14.6447%' }}
            ></Badge>
          }
        ></Avatar>
      </div>
    </>
  )
}
