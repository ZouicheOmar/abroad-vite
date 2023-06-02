/** @format */

import dayjs from 'dayjs'
import {CalendarIcon, GeoFill} from './Icons'

const today = dayjs().month()
const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const formatDateForInput = (date) => {
  return `${date.format('ddd')}, ${date.format('MMM')} ${date.format('DD')}`
}
const formatDateForDatePickerHeader = (date) => {
  return `${date.format('MMM')} ${date.format('YYYY')}`
}

const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
  let refferedMonth = dayjs().year(year).month(month)
  let firstDayOfMonth = refferedMonth.startOf('month')
  let lastDayOfMonth = refferedMonth.endOf('month')
  let realToday = dayjs()
  let dataMonth = []
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    dataMonth.push(refferedMonth.date(i))
  }
  const calendarTitle = formatDateForDatePickerHeader(refferedMonth)

  return [firstDayOfMonth.day(), dataMonth, realToday, calendarTitle]
}

const Calendar = () => {
  const date = generateDate(today)
  const v = date[1]
  return (
    <>
      <div className="calendar-container">
        <p className="ml-0 pl-0 font-title text-center text-xl">
          Events calendar
        </p>
        <div className="calendar-body">
          <div className="calendar-days">
            {week.map((item, index) => (
              <p
                key={index}
                className={`grid justify-center content-center  ${
                  index === 0 || index === 6 ? 'font-bold' : ''
                }`}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="calendar-dates">
            {v.map((item, index) => (
              <span key={index}>{item.$D}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const CalendarEvent = () => {
  return (
    <>
      <div className="eventInCalendar">
        <img src="src/assets/img.jpg" alt="party0" />
        <p className="title">EVENT NAME</p>
        <div className="gradient-blur">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="details">
          <div className="tags">
            <button>Night Out</button>
            <button>Club</button>
            <button>City</button>
            <button>Montpellier</button>
          </div>
          <div>
            <CalendarIcon />
            <p>Juin 2nd</p>
          </div>
          <div>
            <GeoFill />
            <p>Place de L'Europe</p>
          </div>
        </div>
      </div>
    </>
  )
}

function CalendarAndEvent() {
  return (
    <>
      <div className="calendarAndEvent">
        <Calendar />
        <CalendarEvent />
      </div>
    </>
  )
}

export default CalendarAndEvent
