// import { loadStripe } from '@stripe/stripe-js';

// let stripePromise;

// const getStripe = () => {
//   if(!stripePromise) {
//     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
//   }

//   return stripePromise;
// }

// export default getStripe;


import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStipePromise = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

  if (!stripePromise && !!key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStipePromise;