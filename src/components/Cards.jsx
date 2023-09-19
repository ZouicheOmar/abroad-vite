/** @format */
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getSupabase, useImage} from '../functions/functions'
import dayjs from 'dayjs'

import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'

import {Badge} from '../@/components/ui/badge'
import {ChevronRight} from './Icons'

const supabase = getSupabase()

export const MediumEventCard = ({data}) => {
  const [img, setImg] = useState()
  const {id, name, date, img_url, city, type} = data
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
              <button className="event-card-tag">{type}</button>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export const SmallEventCard = ({event}) => {
  const {imgdata, imgloading, imgerror} = useImage(event.img_url)

  return (
    <>
      <Link to={`/`} style={{color: 'inherit', textDecoration: 'inherit'}}>
        <div className="eventcardxs w-[80vw] h-[5rem] rounded overflow-hidden border-[1px] border-slate-800 ">
          {imgdata && <img src={imgdata} alt="party0" />}

          <div className="eventcardmd-details">
            <div className="flex gap-2 items-end mb-[3px]">
              <p className="inline w-fit text-xl backdrop-blur-md	px-2 rounded ">
                {event?.name}
              </p>
            </div>
            <div className="flex gap-2 items-end">
              <Badge
                variant="outline"
                className="rounded text-slate-300 border-slate-500"
              >
                {event?.city}
              </Badge>
              <Badge
                variant="outline"
                className="rounded text-slate-300 border-slate-500"
              >
                {' '}
                {dayjs(event?.date).fromNow()}{' '}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export const SmallEventCardQRCodeAccess = ({event}) => {
  const {imgdata, imgloading, imgerror} = useImage(event.img_url)
  const navigate = useNavigate()

  return (
    <>
      <div className="eventcardxs w-full h-[5rem] rounded overflow-hidden border-[1px] border-slate-800 ">
        {imgdata && <img src={imgdata} alt="party0" />}

        <div className="eventcardmd-details">
          <div className="flex gap-2 items-end mb-[3px]">
            <p className="inline w-fit text-xl backdrop-blur-md	px-2 rounded ">
              {makeFirstLetterUpperCase(event?.name)}
            </p>
          </div>
          <div className="flex gap-2 items-end">
            <Badge
              variant="outline"
              className="rounded text-slate-300 border-slate-500"
            >
              {event?.city}
            </Badge>
            <Badge
              variant="outline"
              className="rounded text-slate-300 border-slate-500"
            >
              {' '}
              {dayjs(event?.date).fromNow()}{' '}
            </Badge>
          </div>
          <span
            className="absolute right-[0.5rem] bottom-[0.5rem] bg-sky-700 rounded ring-[1px] ring-indigo-700"
            onClick={() => {
              console.log('clicked')
            }}
          >
            <ChevronRight />
          </span>
        </div>
      </div>
    </>
  )
}
