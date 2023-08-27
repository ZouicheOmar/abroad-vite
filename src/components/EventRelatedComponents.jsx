/** @format */

import {useContext, useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
import {getDate} from './Calendar'
import {supabase} from '../functions/functions'

import {
  SaveIcon,
  ShareIcon,
  CalendarIcon,
  XIcon,
  GeoFill,
  LeftChevronIcon,
  RightChevronIcon,
} from './Icons'

import {EventsContext} from '../pages/EventsPage'

dayjs.extend(relativeTime)
dayjs.extend(isBetween)

export const MidCardB = ({data}) => {
  const [img, setImg] = useState()
  const {id, name, date, city, type, img_url} = data
  useEffect(() => {
    const getImg = async () => {
      const {data, error} = await supabase.storage
        .from('media')
        .createSignedUrl(img_url, 60)
      error && console.log(error)
      setImg(data.signedUrl)
    }
    getImg()
  })
  return (
    <div className="midcardb ">
      <Link to={`${id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
        <div className="midcardb-info">
          <p className="midcardb-title">{name}</p>
          <p>{dayjs(date).fromNow()}</p>
          <div className="midcardb-tags">
            <button>{city}</button>
            {type && <button>{type}</button>}
          </div>
          <div className="midcardb-share">
            <button>
              <SaveIcon />
            </button>
            <button>
              <ShareIcon />
            </button>
          </div>
        </div>
        <img src={img} alt="tropisme" className="card_img" />
      </Link>
    </div>
  )
}

const Filter = ({type}) => {
  const Icon = () => {
    if (type === 'City') {
      return <GeoFill />
    }
    if (type === 'Date') {
      return <CalendarIcon />
    } else {
      return false //check if this causes problem with children, or maybe no returns at all
    }
  }
  return (
    <button className="filter-button" id={type}>
      <Icon />
      {type}
    </button>
  )
}

export const Filters = () => {
  const cities = ['Geneva', 'Lausanne', 'Montpellier']
  return (
    <div className="filters">
      <div>
        <CityFilter items={cities} />
        <DateFilter />
      </div>
      <div>
        <Filter type="Night Out" />
        <Filter type="City Tour" />
        <Filter type="Trip" />
      </div>
    </div>
  )
}

const CityFilter = ({items}) => {
  const defaultCity = 'City'
  const [open, setOpen] = useState(false)
  const [city, setCity] = useState(defaultCity)
  const ref = useRef()
  const {data, setData, defaultEvents, setDefaultEvents} =
    useContext(EventsContext)

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false)
      }
    })
  }, [])

  const handleOpen = () => setOpen(!open)

  const handleClick = (e) => {
    e.stopPropagation()
    defaultEvents === null && setDefaultEvents(data)
    const dataCopy = [...data]
    const newData = dataCopy.filter(
      (item) => item.city === e.target.getAttribute('value')
    )
    setData(newData)
    setCity(e.target.getAttribute('value'))
    setTimeout(() => {
      setOpen(false)
    }, 300)
  }

  const handleDefaultFilter = (e) => {
    e.stopPropagation()
    setData(defaultEvents)
    setCity(defaultCity)
    setTimeout(() => {
      setOpen(false)
    }, 300)
  }

  return (
    <div className="min-w-fit min-h-fit inline" ref={ref}>
      <span className="filter-button" onClick={handleOpen}>
        <a role="button" className="text-slate-300 hover:text-slate-200">
          <GeoFill />
          {city}
        </a>
        {city !== defaultCity && (
          <a role="button" onClick={handleDefaultFilter}>
            <XIcon />
          </a>
        )}
      </span>
      {open && (
        <div className="citypicker block">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                value={item}
                id={`city${item}`}
                onClick={handleClick}
                className="flex justify-between"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const Calendar = ({titleState}) => {
  const {data, setData, defaultEvents, setDefaultEvents} =
    useContext(EventsContext)
  const {title, setTitle, setOpen} = titleState
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [liveDate, setLiveDate] = useState(getDate())
  const {daysOfMonth, firstDayOfMonth} = liveDate

  const handlePrevMonth = () => {
    if (!firstDayOfMonth.subtract(1, 'month').isBefore(dayjs(), 'month')) {
      setLiveDate({
        ...getDate(dayjs(liveDate.firstDayOfMonth).subtract(1, 'month')),
      })
    }
  }

  const handleNextMonth = () => {
    setLiveDate({...getDate(dayjs(liveDate.firstDayOfMonth).add(1, 'month'))})
  }

  const test = () => {
    console.log(
      'is between :',
      dayjs(data[0].date).isBetween(
        firstDayOfMonth,
        daysOfMonth[daysOfMonth.length - 1],
        'day',
        '[]'
      )
    )
  }

  const checkDate = (item) => {
    const matchingEvents = []
    const events = defaultEvents ?? data
    for (const monEvent of events) {
      if (item.isSame(monEvent.date)) {
        matchingEvents.push(monEvent)
      }
    }
    return matchingEvents
  }

  const gotToEventFromCalendar = (item) => {
    const event = checkDate(item)
    if (event.length) {
      defaultEvents === null && setDefaultEvents(data)
      setTitle(dayjs(event[0].date).format('DD-MMM'))
      setData(event)
      //maybe a transition in here, transition to all pop up elements
      setTimeout(() => {
        setOpen(false)
      }, 300)
    }
  }

  return (
    <>
      <div className="min-w-fit min-h-fit inline">
        <div className="datepickerfilter block">
          <div className="datepickerfilter-header flex justify-between ">
            <a
              role="button"
              className="inline-block border-2 border-white rounded-md"
              onClick={handlePrevMonth}
            >
              <LeftChevronIcon />
            </a>
            <span onClick={test}>{firstDayOfMonth.format('MMM YYYY')}</span>
            <a
              role="button"
              className="inline-block max-h-fit border-2 border-white rounded-md "
              onClick={handleNextMonth}
            >
              <RightChevronIcon />
            </a>
          </div>
          <div className="datepickerfilter-body">
            <div className="datepickerfilter-body-days">
              {week.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
            <div className="datepickerfilter-body-dates">
              {' '}
              {daysOfMonth.map((item, index) => (
                <span
                  key={index}
                  className={`${index === 0 && `start${item.$W}`}
              ${checkDate(item).length > 0 && 'picked'}
              `}
                  onClick={(e) => gotToEventFromCalendar(item)}
                >
                  {item.$D}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const DateFilter = () => {
  const {setData, defaultEvents} = useContext(EventsContext)
  const [open, setOpen] = useState(false)
  const defaultTitle = 'Date'
  const [title, setTitle] = useState(defaultTitle)
  const ref = useRef()

  //can refactor this hook
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false)
      }
    })
  }, [])

  const handleToggle = () => setOpen(!open)
  const handleGetDefaultDate = () => {
    setData(defaultEvents)
    setTitle(defaultTitle)
  }
  return (
    <>
      <div className="min-w-fit min-h-fit inline" ref={ref}>
        <a
          role="button"
          className="filter-button text-slate-300 hover:text-slate-300"
          onClick={handleToggle}
        >
          <CalendarIcon />
          {title}
          {title !== defaultTitle && (
            <span
              className="hover:bg-slate-600 mx-2 rounded-md"
              onClick={handleGetDefaultDate}
            >
              <XIcon />
            </span>
          )}
        </a>
        {open && <Calendar titleState={{title, setTitle, setOpen}} />}
      </div>
    </>
  )
}
