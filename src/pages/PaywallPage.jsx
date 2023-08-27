/** @format */
import {useEffect} from 'react'
import {StripePayementComponent} from '../functions/stripeStore'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {supabase} from '../functions/functions'

import {Button} from '../@/components/ui/button'

const StyledCardElement = () => {
  const cardElementOptions = {
    style: {
      base: {
        color: 'white',
        iconColor: '#94a3b8',
        '::placeholder': {
          color: '#94a3b8',
        },
      },
      invalid: {},
      complete: {
        iconColor: '#22c55e',
      },
    },
    hidePostalCode: true,
    iconStyle: 'solid',
  }

  return (
    <CardElement
      options={cardElementOptions}
      className="border-[1px] rounded border-slate-600 p-2"
    />
  )
}

const PayementComponent = () => {
  const elements = useElements()
  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe && !elements) {
      console.log('failed loading strip or elements')
      console.log('calling stripe returns : ', stripe)
      console.log('calling elements returns : ', elements)
      return
    }

    const cardElement = elements.getElement(CardElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log('error in stripe.paymentMethod : ', error)
      return
    }

    /**
     * If paymentMethod, only means that the payment method is okay
     * the user didn't actually pay yet
     */

    console.log('paymentMethod : ', paymentMethod)

    /**if paymentmethod, stripe.paymentIntent(paymentMethod.details)
     * here <e fire an edge function to make the axios post call
     * All i need to do is to know how to create an edge function
     *
     */

    // const DATA_TO_SEND = {
    //   name: 'raz al ghoul',
    // }
    // const {data, error} = await supabase.functions.invoke('hello-world', {
    //   body: JSON.stringify(DATA_TO_SEND),
    // })
    // if (error) {
    //   console.log('error calling the edge function :', error)
    // }
    // console.log('edge function called :', data)
  }

  return (
    <>
      <div className="w-full p-2">
        {/* <StripePayementComponent> */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <p className="text-white mb-2">payment form starts here</p>
          <StyledCardElement />
          {/* <CardElement
            options={cardElementOptions}
            className="border-[1px] rounded border-slate-600 p-2"
          /> */}
          <Button
            type="submit"
            className="w-fit border-[1px] rounded my-2 self-center hover:cursor-pointer hover:border-[2px]"
          >
            PAY
          </Button>
        </form>
        {/* </StripePayementComponent> */}
      </div>
    </>
  )
}

function PaywallPage() {
  return (
    <>
      <div className="page">
        <p className="title">Paywall page</p>
        <StripePayementComponent>
          <PayementComponent />
        </StripePayementComponent>
      </div>
    </>
  )
}

export default PaywallPage
