export * from './EasyDate'

// 获取一个月中的天数
export function getDaysInMonth(year: number, month: number) {
  if (month === 2) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
  } else {
    return [4, 6, 9, 11].includes(month) ? 30 : 31
  }
}

export function getWeekOnFirstDay(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay()
}
