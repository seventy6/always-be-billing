import {useState} from "react";
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BillingContext } from '../utils/BillingContext'

function MyApp({ Component, pageProps }) {
  
  const [billing, setBilling] = useState('66.00');


  return (
    <ChakraProvider>
        <BillingContext.Provider value={[billing, setBilling]}>
          <Component {...pageProps} />
        </BillingContext.Provider>
    </ChakraProvider>
  )
}
export default MyApp