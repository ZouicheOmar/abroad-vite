/** @format */
import { useEvents, useImage } from '../functions/functions'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useCallback } from 'react'

import { makeFirstLetterUpperCase } from '../functions/textFormattingFunctions'

// import {Skeleton} from '../../@/components/ui/skeleton'

function Card({ data }) {
  const { name, date, city, type, img_url, id } = data
  const { imgdata, imgloading, imgerror } = useImage(img_url)
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`events/${id}`)
  })

  return (
    <>
      <div className="card" onClick={handleClick}>
        {imgloading && <p> loading ... </p>}
        {imgdata !== null && (
          <img src={imgdata} alt="tropisme" className="card_img" />
        )}
        <div className="card-describe">
          <p className="card_title">{name}</p>
          <p className="card_date">{dayjs(date).format('dddd MMMM D')}</p>
        </div>
        <div className="flex gap-2">
          <p className="relative text-sm text-yellow-400  z-10 inline pl-[0.5rem] pr-[0.5rem] rounded bg-neutral-800">
            {makeFirstLetterUpperCase(city)}
          </p>
          {type && (
            <p className="relative text-sm text-yellow-400 z-10 inline pl-[0.5rem] pr-[0.5rem] rounded bg-neutral-800">
              {makeFirstLetterUpperCase(type)}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

function AfterSMCard({ data }) {
  const { name, date, city, type, img_url, id } = data
  const { imgdata, imgloading, imgerror } = useImage(img_url)
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`events/${id}`)
  })

  return (
    <>
      <div
        className="relative flex-col gap-1 jusitfy-end items-center h-[30vh] w-[20vw] object-cover border-2 border-indigo-900 rounded overflow-hidden hover:cursor-pointer"
        onClick={handleClick}
      >
        {imgloading && <p> loading ... </p>}
        {imgdata !== null && (
          <img
            src={imgdata}
            alt="tropisme"
            className=" w-full h-full absolute z-0 object-cover hover:cursor-pointer"
          />
        )}
        <span className="text-sm bg-black rounded absolute left-1 top-1 px-2 text-slate-400">
          {makeFirstLetterUpperCase(city)}
        </span>
        <span className="text-sm bg-black rounded absolute right-1 top-1 px-2 text-slate-400">
          {type && makeFirstLetterUpperCase(type)}
        </span>
        <div className="absolute z-10 p-2 flex border-t-2 border-t-indigo-700 flex-col gap-1 bg-black bg-opacity-70 backdrop-blur leading-none ChivoFontDiv bottom-0 min-w-full min-h-[4rem] hover:text-white hover:font-bold transition  hover:cursor-pointer ">
          <span className="text-xl z-10 leading-none hover:cursor-pointer  ">
            {makeFirstLetterUpperCase(name)}
          </span>
          <span className="z-10 leading-none  hover:cursor-pointer  ">
            {dayjs(date).format('dddd MMMM D')}
          </span>
        </div>
      </div>
    </>
  )
}
function UpcomingOG() {
  const { data, error, loading } = useEvents()

  return (
    <>
      <div className="upcoming md:w-[50%] md:overflow-hidden">
        <p className="title pl-4">Evenements à venir</p>
        <div className="body">
          {loading && <p className="text-3xl">loading...</p>}
          {data &&
            data.map(
              (item, index) => index <= 5 && <Card data={item} key={index} />
            )}
          {error && null}
        </div>
      </div>
    </>
  )
}

function Upcoming() {
  const { data, error, loading } = useEvents()

  return (
    <>
      <div className="upcoming min-w-full sm:w-[50%] sm:overflow-hidden ">
        <p className="text-2xl font-bold pl-4">Upcoming Events</p>
        {loading && <p className="text-3xl">loading...</p>}
        {error && <p className="text-xl text-center"> problem fetching </p>}
        <div className="flex gap-2 sm:mt-2 ">
          {data && (
            <>
              <div className="sm:hidden body">
                {data.map(
                  (item, index) =>
                    index <= 5 && <Card data={item} key={index} />
                )}
              </div>
              <div className="hidden sm:flex sm:gap-1">
                {data.map(
                  (item, index) =>
                    index <= 5 && <AfterSMCard data={item} key={index} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Upcoming
