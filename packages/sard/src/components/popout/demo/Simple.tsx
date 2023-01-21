/*
### 简化操作

使用 PopoutBridge 和 PopoutTarget 以便减少控制显隐、中间值等 state 和 回调的声明。
*/

import { Popout, Calendar, Input, Button } from 'sard'

export default function () {
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        使用 PopoutOutlet 输出值，使用 PopoutSelect
        接受点击事件以显示弹出框，使用 PopoutClear 接受点击事件以删除值。
      </div>
      <Popout title="请选择出生日期">
        <Popout.Target>
          <div>
            <Popout.Select>
              <Button>选择日期</Button>
            </Popout.Select>
            <Popout.Clear>
              <Button>清除</Button>
            </Popout.Clear>
          </div>
          <div>
            选择的日期为：
            <Popout.Outlet />
          </div>
        </Popout.Target>
        <Popout.Bridge>
          <Calendar />
        </Popout.Bridge>
      </Popout>

      <div style={{ margin: '20px 0 10px' }}>更简洁的方式：</div>

      <Popout title="请选择出生日期">
        <Popout.Target select value clear>
          <Input readOnly placeholder="请选择日期" clearable />
        </Popout.Target>
        <Popout.Bridge>
          <Calendar />
        </Popout.Bridge>
      </Popout>
    </>
  )
}
