import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const res = await axios.post(
      "https://ufa-be.up.railway.app/payment/create-intent",
      {
        amount: 200,
        teamId: "66ca07bc486d8f9227bef61a",
        userId: "66c63572033ce3eafc6abd4c",
      }
    );
    if (res?.data?.success) {
      const data = {
        clientSecret: res?.data.data.clientSecret,
        paymentIntentId: res?.data.data.paymentIntent,
      };
      console.log("data..", data);

      const cardElement = elements.getElement(PaymentElement);
      if (!cardElement) {
        setErrorMessage("No card element found");
        return;
      }
      console.log("cardElement....", cardElement);
      console.log("data.clientSecret", data.clientSecret);

      const { token, error } = await stripe.confirmPayment({
        elements,
        clientSecret: res?.data.data.clientSecret,
        confirmParams: {
          return_url: "https://www.npmjs.com/package/@stripe/react-stripe-js",
          // payment_method: "card",
          payment_method_data: {
            billing_details: {
              name: "Umer",
              email: "memonumer504@gmail.com",
              address: {
                city: "karachi",
                country: "PK",
                state: "Sindh",
                postal_code: null,
              },
            },
          },
        },
      });
      console.log("token......", token);

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        console.log("Token:", token.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay 200$
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default Checkout;
