/** @format */

import {loadStripe} from '@stripe/stripe-js'
import Stripe from 'stripe'

const PUBLISHABLE_KEY =
  'pk_test_51NileVJU8o7LRIvAaPEBJa4NQxJ04LCiPv2hgRpytchePMiZyhL1vv0I8dHQX3e3LEN9M9bVqChs9rDr4YdcuMf100XPgBNutw'

const SECRET_KEY =
  'sk_test_51NileVJU8o7LRIvA5NX7WBXrvkkGf74XiP2ykRKlQqbE70V50CcJByLpLKfPwvsXgjtQkYd0RJjl0poFWvB8WGYq00dvIEccw3'

export const stripePromise = loadStripe(PUBLISHABLE_KEY)
export const stripeNode = Stripe(SECRET_KEY)
