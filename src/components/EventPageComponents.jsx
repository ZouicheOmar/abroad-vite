/** @format */

import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useLocation, useNavigate} from 'react-router-dom'
import {supabase, useEvent} from '../functions/functions'
import {useUser} from '../context/userStore'

import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'

import {Title} from '../components/UIComponents'

dayjs.extend(relativeTime)

export const EventBanner = ({src}) => {
  return (
    <div className="eventbanner">
      <img src={src} alt="Event illustration image" className="card_img" />
    </div>
  )
}

export const Tag = ({tag}) => {
  return (
    <button className=" mr-1 px-2 rounded-md bg-black border-[0.5px] border-stone-900">
      {makeFirstLetterUpperCase(tag)}
    </button>
  )
}

export const HeaderBody = ({data}) => {
  const {date, time} = data
  return (
    <div className="flex justify-between">
      <div className="">
        <p className="text-xl"> {dayjs(date).format('dddd MMMM D')} </p>
        <p className="text-yellow-400">
          {dayjs(`${date}${time}`).format('HH:mm')}
        </p>
        <p>{dayjs(date).fromNow()}</p>
      </div>
    </div>
  )
}

export const Header = ({data}) => {
  const {city, type, date, time} = data
  return (
    <Section>
      <Tag tag={city} />
      <Tag tag={type} />
      <HeaderBody data={{date, time}} />
    </Section>
  )
}

export const Section = ({children}) => {
  return (
    <div className="section pb-3 relative border-b-[1px] border-b-neutral-700 ">
      {children}
    </div>
  )
}

export const Description = ({data}) => {
  const {description} = data
  return (
    <Section>
      <p className="text-xl">What are we doing ?</p>
      <p className=" text-justify text-slate-300">{description}</p>
    </Section>
  )
}

export const EventLocation = ({data}) => {
  return (
    <Section>
      <p className="text-xl">Where ?</p>
      <p className=" leading-snug">
        {data.location.place_name} <br />
        <span className="text-slate-300 ">{data.location.address}</span>
        <br />
        <span className="text-slate-300 ">
          {data.location.zipcode}, {data.location.city}
        </span>
      </p>
    </Section>
  )
}

export const Step = ({data}) => {
  const {action, time, location} = data
  return (
    <li className="mb-2 ml-3">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time dateTime="21:00" className="text-white">
        {time}
      </time>
      <p className=" leading-snug text-slate-300 ">
        {action}
        <br />
        {location}
      </p>
    </li>
  )
}

export const Steps = ({children}) => {
  return (
    <Section>
      <p className="text-xl text-white ">Plan</p>
      <ul className="relative border-l  border-gray-200 dark:border-gray-700 text-slate-400">
        {children}
      </ul>
    </Section>
  )
}

export const Plan = ({data}) => {
  const {steps} = data
  return (
    <Steps>
      {steps.map((item, index) => (
        <Step
          data={{
            action: item.action,
            time: item.time,
            location: item.location,
          }}
          key={index}
        />
      ))}
    </Steps>
  )
}

export const Included = ({data}) => {
  return (
    <>
      {data != undefined && (
        <Section>
          <p className="text-xl">What's included ?</p>
          <ul className=" text-slate-300 list-disc list-inside">
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}

export const Brings = ({data}) => {
  useEffect(() => console.log(data), [])
  return (
    <>
      <Section>
        <p className="text-xl">What you need to bring with you</p>
        <ul className=" text-slate-300 list-disc list-inside">
          {data.bring_with.map((item, index) => {
            return <li key={index}>item</li>
          })}
        </ul>
      </Section>
    </>
  )
}

export const Participants = ({list}) => {
  return (
    <>
      <div className="section border-[1px] rounded p-2 px-4 ">
        <p> Abroaders who are in : </p>
        <ul className="list-inside list-disc">
          {list.map((item) => (
            <li key={item.id}>
              <span>{item.first_name + ' ' + item.last_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const Join = ({event_id, setJoined}) => {
  const {user} = useUser()
  const navigate = useNavigate()
  const handleJoinEventClick = async () => {
    console.log('in join button', user.id, ' event id :', event_id)
    console.log
    const id = user.id
    const eventid = event_id
    //TODO : modify table to join auth_id and event_id
    const {data, error} = await supabase.from('events_cross_users').insert({
      event_id: eventid,
      user_id: id,
    })
    if (error) {
      console.log(error)
      return error
    }
    console.log('user joined the event')
    setJoined(true)
    return data
  }
  const handleRedirectToPaywallPage = () => {
    window.scrollTo(0, 0)
    navigate('../../paywallTest', {
      state: {
        id: event_id,
      },
    })
  }

  return (
    <div className="nicebutton" onClick={handleRedirectToPaywallPage}>
      <p className="text-slate-400">Join</p>
    </div>
  )
}

export const AlreadyIn = () => {
  return (
    <div className="border-[1px] rounded border-green-400 px-4 py-2 bg-green-900">
      <p className="font-bold ">You Are IN !</p>
    </div>
  )
}

export const NavigateToLogInButton = () => {
  const navigate = useNavigate()

  return (
    <button
      className="border-[1px] rounded border-white p-2 text-lg hover:cursor-pointer"
      onClick={() => {
        navigate('/logpage')
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }}
    >
      Log In to join
    </button>
  )
}
