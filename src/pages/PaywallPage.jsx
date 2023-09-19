/** @format */
import {useLocation} from 'react-router-dom'
import {useEvent} from '../functions/functions'
import {useEffect, useState} from 'react'
import {Elements} from '@stripe/react-stripe-js'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'

import CardPaymentComponent from '../components/PaymentForm'
import {Button} from '../@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../@/components/ui/accordion'
import {Input} from '../@/components/ui/input'
import {Label} from '../@/components/ui/label'

import {PersonStanding} from 'lucide-react'
import {useUser} from '../context/userStore'

const PaymentPageSmallCard = ({data, img}) => {
  return (
    <>
      <div className="w-full ring-[1px] ring-slate-700 rounded p-4 flex">
        <img
          src={img}
          className="w-[8rem] h-[8rem] object-cover rounded inline"
        />
        <div className="inline w-3/4 px-2 flex flex-col justify-between">
          <p className="text-white text-xl smallTitleBold ">
            {makeFirstLetterUpperCase(data.name)} |{' '}
            {makeFirstLetterUpperCase(data.city)}
          </p>
          <div className="leading-tight">
            <p className="text-slate-200 smallDesc">
              {dayjs(`${data.date}${data.time}`).format('dddd MMM D, h:mm A')}
            </p>
            {data.location && (
              <p className="text-slate-200 smallDesc">
                {data.location.place_name}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const PaymentPagePaymentFlow = ({data}) => {
  const hour = data.meeting_time.slice(0, 2)
  const minute = data.meeting_time.slice(3, 5)
  const meeting_time_display = dayjs(data.date)
    .hour(hour)
    .minute(minute)
    .format('h:mm A')

  useEffect(() => {
    console.log('paymentpageflow event id', data)
  }, [])
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full ring-[1px] ring-slate-700 rounded p-2 flex flex-col  justify-items-center "
      >
        <div className="flex min-w-full justify-items-center justify-start pl-2   ">
          <span className="min-h-full w-fit flex flex-col pb-2 mr-1 scale-[1.13] pt-2  ">
            <PersonStanding />
          </span>
          <div className="leading-none">
            <span className="h-full self-center  smallDesc text-white text-lg">
              {data.meeting_point
                ? data.meeting_point.place_name +
                  ', ' +
                  data.meeting_point.address
                : 'meeting point'}
              , at {data.meeting_time ? meeting_time_display : '9:00PM'}
            </span>
            <br />
            <span className="h-full self-center  smallDesc text-slate-300">
              x 1 ticket
            </span>
          </div>
        </div>
        <div className="w-[99%] text-white text-lg font-bold mr-auto ml-auto ring-1 rounded flex justify-between p-2 mt-2">
          <span>TOTAL : </span>
          <span>{data.price ? data.price : '0'} €</span>
        </div>
        <AccordionItem value="item-1" className="border-none ">
          <AccordionTrigger chevron="false">
            <Button
              variant="custom"
              className="w-full bg-amber-500 text-black rounded-full smallDesc hover:cursor-pointer hover:bg-amber-400   "
            >
              Payment
            </Button>
          </AccordionTrigger>
          <PaymentPagePaymentFlowCardInfo
            amount={data.price}
            event_id={data.id}
          />
        </AccordionItem>
      </Accordion>

      <div className="w-full font-thin  p-2">
        <p>
          After buying the ticket, you'll revieve a QR code by mail, which
          you'll be able to find on your profile page too
        </p>
      </div>
    </>
  )
}

const PaymentPagePaymentFlowCardInfo = ({amount, event_id}) => {
  //Add phone number

  const {user} = useUser()
  const INIT_STATE = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
  }
  const [state, setState] = useState(INIT_STATE)

  return (
    <AccordionContent>
      <div className="flex gap-2 ">
        <div className="w-full">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            name="first_name"
            type="text"
            placeholder="John"
            value={state.first_name}
            onChange={(e) => setState({...state, first_name: e.target.value})}
            required
            className="rounded placeholder:text-slate-400"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            name="last_name"
            type="text"
            placeholder="DOE"
            value={state.last_name}
            onChange={(e) => setState({...state, last_name: e.target.value})}
            required
            className="rounded placeholder:text-slate-400"
          />
        </div>
      </div>
      <Label htmlFor="email">Your email</Label>
      <Input
        name="email"
        type="email"
        placeholder="johnDoe@gmail.com"
        value={state.email}
        onChange={(e) => setState({...state, email: e.target.value})}
        required
        className="rounded placeholder:text-slate-400 mb-[0.35rem]"
      />
      <Input
        name="phone"
        type="tel"
        placeholder="+33 777 92 92 92"
        value={state.phone}
        onChange={(e) => setState({...state, phone: e.target.value})}
        required
        className="rounded placeholder:text-slate-400 mb-[0.35rem]"
      />

      <span className="">Card info</span>
      <CardPaymentComponent
        data={{
          amount: amount,
          first_name: state.first_name,
          last_name: state.last_name,
          email: state.email,
          phone: state.phone,
          event_id: event_id,
        }}
      />
    </AccordionContent>
  )
}

function PaywallPage() {
  const location = useLocation()
  const {data, loading, error, img} = useEvent(location.state.id)

  return (
    <>
      {data && (
        <div className="flex flex-col items-center gap-2 mt-[3rem] w-[92%] min-h-[70vh]">
          <p className="title">Tickets</p>
          <div className="flex flex-col items-center gap-2 mt-[2rem] w-full">
            <PaymentPageSmallCard data={data} img={img} />
            <PaymentPagePaymentFlow data={data} />
          </div>
        </div>
      )}
    </>
  )
}

export default PaywallPage
