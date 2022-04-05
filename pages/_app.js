import {useState, useEffect} from "react";
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BillingContext } from '../utils/BillingContext'
import { formatToCurrency } from "../utils/helpers";

function MyApp({ Component, pageProps }) {
  
  const [billing, setBilling] = useState('0');

  useEffect(() => {
    // once we've hydrated on the client w/ the initial
    // render, check to see if we have a value stored
    // in `localStorage`. if so, update `value`. this
    // will result in a second render.
    // (no need to check for existence of `window` cuz
    // it's guaranteed to be there)
    const billingRate = localStorage.getItem('billingRate')

    if (billingRate) {
      setBilling(billingRate)
    }
  }, [])

  return (
    <ChakraProvider>
        <BillingContext.Provider value={[billing, setBilling]}>
          <Component {...pageProps} />
        </BillingContext.Provider>
    </ChakraProvider>
  )
}
export default MyApp