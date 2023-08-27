/** @format */

import dayjs from 'dayjs'

const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const formatDateForDatePickerHeader = (date) => {
  return `${date.format('MMM')} ${date.format('YYYY')}`
}

export const getDayOfWeek = (n) => {
  return WEEK[n]
}

export const getHorizontalDates = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  let monthArray = []
  for (let i = 0; i <= 31; i++) {
    monthArray.push(dayjs().date(dayjs().date() + i))
  }

  return {monthArray}
}

// const testArray = getHorizontalDates()

// testArray.monthArray.map((item) => {
//   console.log(getDayOfWeek(item.$W))
// })

// console.log("un mois à partir d'aujourd'hui : ", dayjs().month(dayjs().month() + 1))

// FIRST VERSION OF generateDate
// export const generateDate = (
//   month = dayjs().month(),
//   year = dayjs().year()
// ) => {
//   let refferedMonth = dayjs().year(year).month(month)
//   let firstDayOfMonth = refferedMonth.startOf('month')
//   let lastDayOfMonth = refferedMonth.endOf('month')
//   let realToday = dayjs()
//   let dataMonth = []
//   for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
//     dataMonth.push(refferedMonth.date(i))
//   }
//   const calendarTitle = formatDateForDatePickerHeader(refferedMonth)

//   return [firstDayOfMonth.day(), dataMonth, realToday, calendarTitle]
// }

export const getDate = (date = dayjs()) => {
  const firstDayOfMonth = date.startOf('month')
  const lastDayOfMonth = date.endOf('month')
  const daysOfMonth = []
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    daysOfMonth.push(date.date(i))
  }
  return {firstDayOfMonth, daysOfMonth}
}
