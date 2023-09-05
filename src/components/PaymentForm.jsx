/** @format */
import {useElements} from '@stripe/react-stripe-js'
import {useStripe} from '@stripe/react-stripe-js'

import {StripePayementComponent} from '../functions/stripeStore'
import {CardElement} from '@stripe/react-stripe-js'
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

function PayementForm() {
  const elements = useElements()
  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()
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

export default function CardPaymentComponent() {
  return (
    <StripePayementComponent>
      <PayementForm />
    </StripePayementComponent>
  )
}
