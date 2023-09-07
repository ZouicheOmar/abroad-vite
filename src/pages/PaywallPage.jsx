/** @format */
import {useLocation} from 'react-router-dom'
import {useEvent} from '../functions/functions'
import {useEffect} from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

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
            {data.name} | {data.city}
          </p>
          <div className="leading-tight">
            <p className="text-slate-200 smallDesc">
              {dayjs(data.date).format('dddd MMM D')},
              {dayjs(`${data.date}${data.time}`).format('HH:mm')}
            </p>
            <p className="text-slate-200 smallDesc">
              {data.location ? data.location : 'Meeting point'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

const PaymentPagePaymentFlow = ({data}) => {
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
            {/* <span className="h-full self-center  smallDesc text-white text-lg">
              By Day : Meet at Gare Saint-Roch at 9:00 PM
            </span> */}
            <span className="h-full self-center  smallDesc text-white text-lg">
              {data.meeting_point ? data.meeting_point : 'meeting point'}, at{' '}
              {data.meeting_time ? data.meeting_time : '9:00PM'}
            </span>
            <br />
            <span className="h-full self-center  smallDesc text-slate-300">
              x 1 ticket
            </span>
          </div>
        </div>
        <div className="w-[99%] text-white text-lg font-bold mr-auto ml-auto ring-1 rounded flex justify-between p-2 mt-2">
          <span>TOTAL : </span>
          <span>{data.price ? data.price : '0€'}</span>
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
          <AccordionContent>
            <div className="flex gap-2 ">
              <div className="w-full">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  name="first_name"
                  type="text"
                  placeholder="John"
                  required
                  className="rounded text-slate-400"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  name="last_name"
                  type="text"
                  placeholder="DOE"
                  required
                  className="rounded text-slate-400"
                />
              </div>
            </div>
            <Label htmlFor="email">Your email</Label>
            <Input
              name="email"
              type="email"
              placeholder="johnDoe@gmail.com"
              required
              className="rounded text-slate-400 mb-[0.35rem]"
            />

            <span className="">Card info</span>
            <CardPaymentComponent />
          </AccordionContent>
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
