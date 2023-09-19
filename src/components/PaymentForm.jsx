/** @format */
import {useElements} from '@stripe/react-stripe-js'
import {useStripe} from '@stripe/react-stripe-js'
import {useNavigate} from 'react-router-dom'
import {useUser} from '../context/userStore'

import {supabase} from '../functions/functions'

import {StripePayementComponent} from '../functions/stripeStore'
import {CardElement} from '@stripe/react-stripe-js'
import {Button} from '../@/components/ui/button'
import {useEffect} from 'react'

const PROD_URL = 'https://abroad-vite.vercel.app/api/create-payment-intent'
const DEV_URL = 'api/create-payment-intent'

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

function PayementForm({data}) {
  const elements = useElements()
  const stripe = useStripe()
  const user = useUser()
  const navigate = useNavigate()

  const {amount, first_name, last_name, email, phone, event_id} = data

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe && !elements) {
      console.log('failed loading strip or elements')
      console.log('calling stripe returns : ', stripe)
      console.log('calling elements returns : ', elements)
      return
    }

    const card_element = elements.getElement('card')

    const response = await fetch(PROD_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount: amount * 100}),
    }).then((res) => res.json())

    const {client_secret} = response.paymentIntent

    const PAYMENT_RESULT_OBJECT = {
      payment_method: {
        card: card_element,
        billing_details: {
          name: first_name + ' ' + last_name,
          email: email,
          phone: phone,
        },
      },
    }

    const paymentResult = await stripe.confirmCardPayment(
      client_secret,
      PAYMENT_RESULT_OBJECT
    )

    //C'est avec PaymentResult que l'état de l'UI change

    if (paymentResult.error) {
      console.log('payment error', paymentResult.error)
      return
    }

    if (paymentResult.paymentIntent.status === 'succeeded') {
      console.log(
        'paymentResult status : ',
        paymentResult.paymentIntent.status,
        paymentResult.paymentIntent
      )
      console.log('payment done ')
      navigate('/success', {
        state: {
          event_id: event_id,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          email: email,
        },
      })
      window.scrollTo({
        top: 0,
        left: 0,
        bahavior: 'smooth',
      })
      //if I add this to the table, the purchaser's id most match the user's ID
      const ADD_EVENTS_CROSS_USERS = await supabase
        .from('events_cross_users')
        .insert({
          event_id: event_id,
          user_id: user.user.id,
        })
      if (ADD_EVENTS_CROSS_USERS.error) {
        console.log(
          'error adding user to the event :',
          ADD_EVENTS_CROSS_USERS.error
        )
      }
      console.log(ADD_EVENTS_CROSS_USERS.data)
    } else {
      console.log('whats wrong :', paymentResult)
    }
  }

  return (
    <>
      <div className="w-full">
        {/* <StripePayementComponent> */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <StyledCardElement />
          <Button
            type="submit"
            className="w-[30%] border-[1px] rounded my-2 self-end hover:cursor-pointer hover:bg-green-800 transition-all duration-100"
          >
            PAY
          </Button>
        </form>
      </div>
    </>
  )
}

export default function CardPaymentComponent({data}) {
  return (
    <StripePayementComponent>
      <PayementForm data={data} />
    </StripePayementComponent>
  )
}
