/** @format */
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

const PaymentPageSmallCard = () => {
  return (
    <>
      <div className="w-full ring-[1px] ring-slate-700 rounded p-4 flex">
        <img
          src="./img.jpg"
          className="w-[8rem] h-[8rem] object-cover rounded inline"
        />
        <div className="inline w-3/4 px-2">
          <p className="text-white text-xl smallTitleBold ">
            Boad Party | Palavas les Flots
          </p>
          <p className="text-slate-200">Saturday Sep. 9th, 11:00 PM</p>
          <p className="text-slate-200">Carnon plage</p>
        </div>
      </div>
    </>
  )
}

const PaymentPagePaymentFlow = () => {
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
              By Day : Meet at Gare Saint-Roch at 9:00 PM
            </span>
            <br />
            <span className="h-full self-center  smallDesc text-slate-300">
              x 1 ticket
            </span>
          </div>
        </div>
        <div className="w-[99%] text-white text-lg font-bold mr-auto ml-auto ring-1 rounded flex justify-between p-2 mt-2">
          <span>TOTAL : </span>
          <span>99€</span>
        </div>
        <AccordionItem value="item-1" className="border-none ">
          <AccordionTrigger chevron={false}>
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
  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-[3rem] w-[92%] min-h-[70vh]">
        <p className="title">Tickets</p>
        <div className="flex flex-col items-center gap-2 mt-[2rem] w-full">
          <PaymentPageSmallCard />
          <PaymentPagePaymentFlow />
        </div>
      </div>
    </>
  )
}

export default PaywallPage
