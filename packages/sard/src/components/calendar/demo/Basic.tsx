/*
### 基础使用
*/

import { Calendar, Toast } from 'sard'

export default function () {
  const handleChange = (date: string) => {
    Toast.text(date)
  }

  return <Calendar defaultValue="2022-09-25" onChange={handleChange} />
}
