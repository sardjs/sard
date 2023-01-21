/*
### 不包裹组件

通常使用徽标包裹组件， 如果要在结构固定的组件里添加徽标，不好将其包裹，可以给组件加个相对定位，让组件包裹徽标，并配置 fixed
*/

import { Badge, Button } from 'sard'

export default function () {
  return (
    <>
      <Button style={{ position: 'relative' }}>
        消息 <Badge fixed value={5}></Badge>
      </Button>
    </>
  )
}
