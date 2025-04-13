import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const processStripePayment = async (clientSecret: string) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to load');

  const { error, paymentIntent } = await stripe.confirmPayment({
    elements: {
      payment_method: {
        card: {
          token: clientSecret
        }
      }
    },
    confirmParams: {
      return_url: `${window.location.origin}/payment-success`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return paymentIntent;
};
