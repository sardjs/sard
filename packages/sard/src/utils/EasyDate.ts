export class EasyDate {
  public year = 0
  public month = 0
  public date = 0

  constructor(dateOrDateString: string | Date)
  constructor(year: number, month: number, date: number)
  constructor(dateOrYearOrString: any, month = 1, date = 1) {
    if (dateOrYearOrString instanceof Date) {
      date = dateOrYearOrString.getDate()
      month = dateOrYearOrString.getMonth() + 1
      dateOrYearOrString = dateOrYearOrString.getFullYear()
    } else if (typeof dateOrYearOrString === 'string') {
      ;[dateOrYearOrString, month, date] = dateOrYearOrString
        .split(/[^\d]+/)
        .map((_) => +_ || 0)
    }
    this.year = dateOrYearOrString
    this.month = month
    this.date = date
  }

  public copy(easyDate: EasyDate) {
    this.year = easyDate.year
    this.month = easyDate.month
    this.date = easyDate.date
  }

  public clone() {
    return new EasyDate(this.year, this.month, this.date)
  }

  public toString() {
    return (
      this.year.toString().padStart(4, '0') +
      '-' +
      this.month.toString().padStart(2, '0') +
      '-' +
      this.date.toString().padStart(2, '0')
    )
  }

  public toNumber() {
    return this.year * 10000 + this.month * 100 + this.date
  }

  public toDate() {
    return new Date(this.year, this.month - 1, this.date)
  }

  public eq(easyDate: EasyDate) {
    return (
      this.date === easyDate.date &&
      this.month === easyDate.month &&
      this.year === easyDate.year
    )
  }

  public gt(easyDate: EasyDate) {
    return this.toNumber() > easyDate.toNumber()
  }

  public lt(easyDate: EasyDate) {
    return this.toNumber() < easyDate.toNumber()
  }

  public gte(easyDate: EasyDate) {
    return this.toNumber() >= easyDate.toNumber()
  }

  public lte(easyDate: EasyDate) {
    return this.toNumber() <= easyDate.toNumber()
  }
}

export default EasyDate
