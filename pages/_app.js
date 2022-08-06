import { useState, useEffect } from "react";
//import "../styles/globals.css";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import { BillingContext } from "../utils/BillingContext";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }) {
  const [billing, setBilling] = useState({
    billingRate: 100,
    billingHoursPerDay: 7.5,
    taxRate: 0.4,
    currency: "USD",
  });

  const [storageChanged, setStorageChanged] = useState(false);
  useEffect(() => {
    if (storageChanged) return;
    // once we've hydrated on the client w/ the initial
    // render, check to see if we have a value stored
    // in `localStorage`. if so, update `value`. this
    // will result in a second render.
    // (no need to check for existence of `window` cuz
    // it's guaranteed to be there)

    const billingRate = localStorage.getItem("billingRate");
    const billingHoursPerDay = localStorage.getItem("billingHoursPerDay");
    const taxRate = localStorage.getItem("taxRate");
    const currency = localStorage.getItem("currency");

    setBilling({
      billingRate: billingRate ? billingRate : billing.billingRate,
      billingHoursPerDay: billingHoursPerDay
        ? billingHoursPerDay
        : billing.billingHoursPerDay,
      taxRate: taxRate ? taxRate : billing.taxRate,
      currency: currency ? currency : billing.currency,
    });
    if (!storageChanged) setStorageChanged(true);
  }, [billing]);
  if (!storageChanged) return <></>;
  return (
    <ChakraProvider>
      <BillingContext.Provider value={[billing, setBilling]}>
        <Header />
        <Container
          minWidth={["max-width", "container.lg"]}
          px={[2, 20]}
          py={[2, 10]}
          alignItems="center"
          alignContent="center"
        >
          <Flex
            minW={"100%"}
            p={[0, 5, 10]}
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Component {...pageProps} />{" "}
          </Flex>
        </Container>
      </BillingContext.Provider>{" "}
    </ChakraProvider>
  );
}
export default MyApp;
