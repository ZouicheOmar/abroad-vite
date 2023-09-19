/** @format */

import Stripe from 'stripe'

const stripe = Stripe(
  'sk_test_51NileVJU8o7LRIvA5NX7WBXrvkkGf74XiP2ykRKlQqbE70V50CcJByLpLKfPwvsXgjtQkYd0RJjl0poFWvB8WGYq00dvIEccw3'
)

export default async function handler(request, response) {
  if (!request.url) return response.status(400)

  const {amount} = request.body

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'eur',
    payment_method_types: ['card'],
  })

  return response.status(200).json({paymentIntent})
}
