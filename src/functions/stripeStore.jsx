/** @format */

import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

/**
 * Don't call loadStripe inside the render part of a component
 * need to use import.meta.env.PUBLISHABLE_KEY in production
 */

/**
 * GETTTING ACCESS the the publishable_key
 *  Might need to fetch throught the supabase database or a server, but i got no server
 */

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)

export const StripePayementComponent = ({children}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>
}
