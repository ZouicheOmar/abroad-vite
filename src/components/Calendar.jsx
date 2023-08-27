/** @format */

import {useState, useEffect, useReducer, useCallback} from 'react'
import {Link} from 'react-router-dom'
import {supabase, useEvents} from '../functions/functions'
import dayjs from 'dayjs'

import {HorizontalDatePicker} from './HorizontalDatePicker'
import {BrowseEventsButton} from './BrowserEventsButton'

const today = dayjs().month()
const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const formatDateForDatePickerHeader = (date) => {
  return `${date.format('MMM')} ${date.format('YYYY')}`
}
export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
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
export const getDate = (date = dayjs()) => {
  const firstDayOfMonth = date.startOf('month')
  const lastDayOfMonth = date.endOf('month')
  const daysOfMonth = []
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    daysOfMonth.push(date.date(i))
  }
  return {firstDayOfMonth, daysOfMonth}
}
const DateItem = ({item, index}) => {
  return (
    <div className="upcoming-dates-date" key={index}>
      <span>{week[item.$W]}</span>
      <span>{item.$D}</span>
    </div>
  )
}
const DatesCarousel = () => {
  const date = generateDate(today)
  const v = date[1]
  return (
    <>
      <div className="upcoming-dates-body">
        {v.map((item, index) => (
          <DateItem item={item} key={index} />
        ))}
      </div>
    </>
  )
}
export const EventCardMD = ({data}) => {
  const [img, setImg] = useState()
  const {id, name, date, img_url, city} = data

  useEffect(() => {
    const getImg = async () => {
      const {data, error} = await supabase.storage
        .from('media')
        .createSignedUrl(img_url, 60)
      error && console.log(error)
      setImg(data.signedUrl)
    }
    getImg()
  }, [])
  return (
    <>
      <Link
        to={`/events/${id}`}
        style={{color: 'inherit', textDecoration: 'inherit'}}
      >
        <div className="eventcardmd">
          <img src={img} alt="party0" />

          <div className="eventcardmd-details">
            <p className="eventcardmd-details-title">{name}</p>
            <p className="eventcardmd-details-date">{dayjs(date).fromNow()}</p>
            <p className="eventcardmd-details-place">{city}</p>
            <div className="eventcardmd-tags">
              <button className="event-card-tag">Night Out</button>
              <button className="event-card-tag">Club</button>
              <button className="event-card-tag">City</button>
              <button className="event-card-tag">Montpellier</button>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export const DatePicker = () => {
  const date = generateDate(today)
  const v = date[1]
  return (
    <div className="datepicker">
      <div className="datepicker-header">Juin 2023</div>
      <div className="datepicker-body">
        <div className="datepicker-body-days">
          {week.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className="datepicker-body-dates">
          {' '}
          {v.map((item, index) => (
            <span
              key={index}
              className={`${index === 0 && `start${item.$W}`}
              ${index === 23 && 'picked'}`}
            >
              {item.$D}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function EventsOfDate() {
  const {data} = useEvents()
  const [eventsDisplayed, setEventsDisplayed] = useState(data)
  const [selectedDate, setSelectedDate] = useState(null)
  useEffect(() => {
    let newArr = []
    setEventsDisplayed(data)
    if (selectedDate !== null) {
      for (const event of data) {
        if (selectedDate.isSame(dayjs(event.date), 'D')) {
          newArr.push(event)
        }
      }
    }
    setEventsDisplayed([...newArr])
    console.log('new displayed ? : ', eventsDisplayed)
  }, [selectedDate, data])
  return (
    <>
      <div className="eventsofdate">
        {/* <DatesCarousel /> */}
        <HorizontalDatePicker filter={{selectedDate, setSelectedDate}} />
        <p onClick={() => console.log(selectedDate)}>test</p>
        {data &&
          data.map((item, index) => {
            if (index >= 3) {
              return
            }
            return <EventCardMD data={item} key={item.id} />
          })}
      </div>
    </>
  )
}

export default EventsOfDate
