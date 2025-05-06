import React, { useContext, useState } from "react";
import { BillingContext } from "../utils/BillingContext";
import {
  formatToCurrency,
  parseCurrencyToNumber,
  formatToPercent,
  parsePercentToNumber,
} from "../utils/helpers";

import CurrencySelector from "./CurrencySelector";
import {
  getCurrencySelectorFromCode,
  getCurrencyFromCode,
} from "../data/currencies";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function Billing(props) {
  const [billing, setBilling] = useContext(BillingContext);
  const [selectedCurrency, setSelectedCurrency] = useState(
    getCurrencySelectorFromCode(billing.currency)
  );

  console.log("billing.js > ", billing, selectedCurrency);

  const updateRate = (val) => {
    const numericValue = parseCurrencyToNumber(val);
    setBilling({
      billingRate: numericValue,
      billingHoursPerDay: billing.billingHoursPerDay,
      currency: billing.currency,
      taxRate: billing.taxRate,
    });
    localStorage.setItem("billingRate", numericValue);
  };
  
  const updateHours = (val) => {
    const numericValue = parseFloat(val);
    setBilling({
      billingHoursPerDay: numericValue,
      billingRate: billing.billingRate,
      currency: billing.currency,
      taxRate: billing.taxRate,
    });
    localStorage.setItem("billingHoursPerDay", numericValue);
  };
  
  const updateTax = (val) => {
    const newVal = parsePercentToNumber(val) / 100;
    console.log(val, newVal);
    setBilling({
      billingHoursPerDay: billing.billingHoursPerDay,
      billingRate: billing.billingRate,
      currency: billing.currency,
      taxRate: newVal,
    });
    localStorage.setItem("taxRate", newVal);
  };
  
  const updateCurrency = (val) => {
    console.log("updateCurrency", val);
    setBilling({
      billingRate: billing.billingRate,
      billingHoursPerDay: billing.billingHoursPerDay,
      taxRate: billing.taxRate,
      currency: val.value,
    });
    localStorage.setItem("currency", val.value);
    setSelectedCurrency(getCurrencySelectorFromCode(val.value));
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          <div className="p-4">
            <label htmlFor="billingRate" className="text-sm font-medium">
              Billing Rate <br />
              <span className="italic text-sm text-muted-foreground">
                (hourly)
              </span>
            </label>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <Input
                id="billingRate"
                type="text"
                value={formatToCurrency(
                  billing.billingRate,
                  getCurrencyFromCode(billing.currency)
                )}
                onChange={(e) => updateRate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4">
            <label htmlFor="hoursPerDay" className="text-sm font-medium">
              Hours Per Day
            </label>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <Input
                id="hoursPerDay"
                type="number"
                value={billing.billingHoursPerDay}
                onChange={(e) => updateHours(e.target.value)}
                step="0.5"
                min="0.5"
                max="24"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4">
            <label htmlFor="taxRate" className="text-sm font-medium">
              Tax Rate
            </label>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <Input
                id="taxRate"
                type="text"
                value={formatToPercent(billing.taxRate)}
                onChange={(e) => updateTax(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4">
            <label htmlFor="currency" className="text-sm font-medium">
              Currency
            </label>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <CurrencySelector
                currencyObject={props.currencyObject}
                onChange={updateCurrency}
                selectedItem={selectedCurrency}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Billing;
