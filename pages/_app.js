import { useState, useEffect } from "react";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BillingContext } from "../utils/BillingContext";

function MyApp({ Component, pageProps }) {
  const [billing, setBilling] = useState({
    billingRate: 100,
    billingHoursPerDay: 7.5,
    taxRate: 0.4,
  });

  console.log("app.js > ", billing);

  useEffect(() => {
    // once we've hydrated on the client w/ the initial
    // render, check to see if we have a value stored
    // in `localStorage`. if so, update `value`. this
    // will result in a second render.
    // (no need to check for existence of `window` cuz
    // it's guaranteed to be there)

    const billingRate = localStorage.getItem("billingRate");
    const billingHoursPerDay = localStorage.getItem("billingHoursPerDay");
    const taxRate = localStorage.getItem("taxRate");

    setBilling({
      billingRate: billingRate ? billingRate : billing.billingRate,
      billingHoursPerDay: billingHoursPerDay
        ? billingHoursPerDay
        : billing.billingHoursPerDay,
      taxRate: taxRate ? taxRate : billing.taxRate,
    });

    console.log("app.js > useeffect > ", billing);
  }, []);

  return (
    <ChakraProvider>
      <BillingContext.Provider value={[billing, setBilling]}>
        <Component {...pageProps} />
      </BillingContext.Provider>
    </ChakraProvider>
  );
}
export default MyApp;
