/** @format */
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useImage} from '../functions/functions'
import {supabase} from '../functions/functions'
import {useUser} from '../context/userStore'
import dayjs from 'dayjs'

import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'

import {EventTicket} from '../pages/PurchaseSuccessPage'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../@/components/ui/collapsible'
import {Badge} from '../@/components/ui/badge'
import {ChevronRight} from './Icons'
import {OpenCircleChevronDown} from './Icons'
import {getDate} from './Calendar'

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
    </>
  )
}

export const SmallEventCardQRCodeAccess = ({event}) => {
  const {imgdata, imgloading, imgerror} = useImage(event.img_url)

  return (
    <>
      <div className="eventcardxs w-[85vw] h-[5rem] rounded overflow-hidden border-[1px] border-slate-800 ">
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
        </div>
      </div>
    </>
  )
}

export const SmallCardWithQrCode = ({event, user_id}) => {
  const [state, setState] = useState(null)
  console.log('data fed to smallCardWQrCode', event, user_id)

  useEffect(() => {
    const fetch = async (id) => {
      const {data, error} = await supabase
        .from('events_cross_users')
        .select()
        .eq('user_id', user_id)
      if (error) {
        console.log('error', error)
        return
      }
      data.forEach((item) => {
        if (item.event_id === event.id) {
          console.log('matched item : ', item)
          setState({
            first_name: item.participant_first_name,
            last_name: item.participant_last_name,
          })

          console.log('now state is  : ', state)
        }
      })
      console.log('state from smallCardWQRCode', state)
      console.log('from smallCardWQRCode data fetched', data)
    }
    fetch(user_id)
  }, [])

  return (
    <>
      {state !== null && (
        <>
          <SmallEventCardQRCodeAccess event={event} />
          <Collapsible className="  ">
            <CollapsibleTrigger className="data-[state=open]:rotate-[-180deg] transition-transform absolute top-[3rem] right-[0.5rem] focus:outline-none hover:cursor-pointer">
              <OpenCircleChevronDown className="scale-[115%]" />
            </CollapsibleTrigger>
            <CollapsibleContent className=" w-full mt-2 mb-6 ">
              <EventTicket data={state} event_data={event} />
            </CollapsibleContent>
          </Collapsible>
        </>
      )}
    </>
  )
}

export const CollapsibleSmallCards = () => {
  const {user, userEvents, userEventsFromCross} = useUser()

  console.log('From collapsibleSmallCards', userEvents)
  console.log('user From collapsibleSmallCards', user)

  return (
    <>
      {userEvents?.length > 0 &&
        userEvents.map((item, index) => (
          <div className="relative" key={index}>
            <SmallCardWithQrCode event={item} user_id={user.id} />
          </div>
        ))}
    </>
  )
}
