/** @format */

import {useLocation, useNavigate} from 'react-router-dom'
import {useEvent} from '../functions/functions'
import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import QRCode from 'react-qr-code'
import {Separator} from '@radix-ui/react-dropdown-menu'
import {Ticket, HelloPerson} from '../components/Icons'
import {useEffect} from 'react'

const QRCodeTest = ({value}) => {
  return (
    <div className="h-auto w-fit p-2  rounded">
      <QRCode
        size={256}
        className=" bg-red-300 w-[7rem] rounded ring-[2px] ring-indigo-400 h-[7rem] ml-auto mr-auto mt-2 mb-2 "
        // value="https://www.npmjs.com/package/react-qr-code"
        value={value}
        viewBox={`0 0 256 256`}
      />
    </div>
  )
}

export const EventTicket = ({data, event_data}) => {
  useEffect(() => {
    console.log('purchaser data : ', data)
    console.log('event data : ', event_data)

    console.log('meeting_time : ', event_data.meeting_time)
    console.log('time : ', event_data.time)
  })

  const meeting_time_hour = event_data.meeting_time.slice(0, 2)
  const meeting_time_minute = event_data.meeting_time.slice(3, 5)
  const meeting_time_display = dayjs(event_data.date)
    .hour(meeting_time_hour)
    .minute(meeting_time_minute)
    .format('h:mm A')

  const time_hour = event_data.time.slice(0, 2)
  const time_minute = event_data.time.slice(3, 5)
  const time_display = dayjs(event_data.date)
    .hour(time_hour)
    .minute(time_minute)
    .format('h:mm A')

  return (
    <div className="w-full ChivoFontDiv ">
      <div className="w-full flex flex-col gap-4 bg-indigo-950 rounded border-[1px] border-indigo-700 p-2">
        <div className="w-full flex justify-between">
          <span className="abroad-logo">ABROAD</span>
          <div className=" flex gap-2 mt-1">
            <div className=" flex flex-col leading-none">
              <span>Event </span>
              <span className="text-sm">
                {makeFirstLetterUpperCase(event_data.name)}
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="bg-sky-700 w-[1px] h-full"
            />
            <div className="flex flex-col leading-none">
              <span>Date</span>
              <span className="text-sm">
                {dayjs(event_data.date).format('ddd, MMM D')}
              </span>
            </div>
          </div>
        </div>
        <div className="leading-tight">
          <span>Location : </span>
          <span>
            {' '}
            {makeFirstLetterUpperCase(event_data.location.place_name) +
              ', ' +
              makeFirstLetterUpperCase(event_data.location.address)}{' '}
            <br />
            {event_data.location.zipcode +
              ', ' +
              makeFirstLetterUpperCase(event_data.location.city)}
          </span>
          <br />
          <span> At </span>
          <span> {time_display}</span>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col leading-none">
            <p className="leading-none">
              MEET : <br />
              <span className="text-xl">
                {makeFirstLetterUpperCase(event_data.meeting_point.place_name)}{' '}
              </span>
              <br />
              <span className="text-md">
                {makeFirstLetterUpperCase(event_data.meeting_point.address) +
                  ', ' +
                  makeFirstLetterUpperCase(
                    event_data.meeting_point.zipcode_and_city
                  )}
              </span>
            </p>
          </div>
          <div className="flex flex-col leading-none">
            <p className="leading-none">
              TIME : <br />
              <span className="text-xl">{meeting_time_display} </span>
            </p>
          </div>
        </div>

        <div className="flex w-full my-2 justify-center">
          <QRCodeTest value="success" />
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col leading-none">
            <p className="leading-none">
              Participant :
              <br />
              <span className="text-xl">
                {makeFirstLetterUpperCase(data.first_name) +
                  ' ' +
                  makeFirstLetterUpperCase(data.last_name)}
              </span>
            </p>
          </div>
        </div>
        <div className="flex">
          <HelloPerson />
          <Ticket />
        </div>
      </div>
      <p className="mt-6 leading-none text-slate-400">
        Your ticket for the event, already saved on your profile page
      </p>
    </div>
  )
}

function PurshaseSuccess() {
  const location = useLocation()
  const {data, loading, error, img} = useEvent(location.state.event_id)
  useEffect(() => {
    console.log('location data : ', location.state)
    console.log('event data : ', data)
  })
  return (
    <div className="page mt-[20%] text-white">
      <p className="title ">🎆You are in🎉🎉</p>
      {data && <EventTicket data={location.state} event_data={data} />}
    </div>
  )
}

export default PurshaseSuccess
