import { useState, useEffect, useRef, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51NTfNnFZBUanTSPGPrsF6rWLNPzpv8DnG6u3THjcQ42IkBNIoM7WovT3g1gV24hSY5bBpiDOICqbmBMqY63wsCIK00dljJ1UZj"
  );

  const options = {
    mode: "payment",
    amount: 200,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <Checkout />
      </Elements>
    </>
  );
}

export default App;
