import { useState, useEffect } from "react";
import "../styles/globals.css";
import { BillingContext } from "../utils/BillingContext";
import { Header } from "../components/Header";
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <BillingContext.Provider value={[billing, setBilling]}>
        <Header />
        <div className="container mx-auto px-2 md:px-20 py-2 md:py-10 items-center content-center">
          <div className="w-full p-0 md:p-5 lg:p-10 flex flex-col md:flex-row">
            <Component {...pageProps} />
          </div>
        </div>
        <Script
          id="gogo"
          defer
          data-domain="always-be-billing.netlify.app"
          src="https://gogo-analytics.netlify.app/scripts/gogo.min.js"
        ></Script>
      </BillingContext.Provider>
    </ThemeProvider>
  );
}
export default MyApp;
