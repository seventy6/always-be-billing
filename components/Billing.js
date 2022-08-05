import React, { useContext, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { BillingContext } from "../utils/BillingContext";
import {
  formatToCurrency,
  parseCurrencyToNumber,
  formatToPercent,
  parsePercentToNumber,
} from "../utils/helpers";

import CurrencySelector from "./CurrencySelector";
import { getCurrencyFromCode } from "../data/currencies";

function Billing(props) {
  const [billing, setBilling] = useContext(BillingContext);
  const [selectedCurrency, setSelectedCurrency] = useState(
    getCurrencyFromCode(billing.currency)
  );

  console.log("billing.js > ", billing, selectedCurrency);

  const updateRate = (val) => {
    setBilling({
      billingRate: parseCurrencyToNumber(val),
      billingHoursPerDay: billing.billingHoursPerDay,
      currency: billing.currency,
      taxRate: billing.taxRate,
    });
    localStorage.setItem("billingRate", parseCurrencyToNumber(val));
  };
  const updateHours = (val) => {
    setBilling({
      billingHoursPerDay: val,
      billingRate: billing.billingRate,
      currency: billing.currency,
      taxRate: billing.taxRate,
    });
    localStorage.setItem("billingHoursPerDay", parseCurrencyToNumber(val));
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
      billingHoursPerDay: val,
      billingHoursPerDay: billing.billingHoursPerDay,
      billingRate: billing.billingRate,
      taxRate: billing.taxRate,
      currency: val.value,
    });
    localStorage.setItem("currency", val.value);
    setSelectedCurrency(getCurrencyFromCode(val.value));
  };
  //const formatToCurrency = (val) => `$` + val

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={2}
      py={1}
      my={0}
      bg="whiteAlpha.300"
      borderRadius="md"
    >
      <GridItem p={4}>
        <FormLabel htmlFor="Set Your Billing Rate"> Billing Rate </FormLabel>{" "}
      </GridItem>{" "}
      <GridItem p={4}>
        <FormControl>
          <NumberInput
            value={formatToCurrency(billing.billingRate)}
            precision={0}
            step={5.0}
            onChange={(valueString) => updateRate(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>{" "}
          </NumberInput>{" "}
          <FormHelperText> </FormHelperText>{" "}
        </FormControl>{" "}
      </GridItem>{" "}
      <GridItem px={4}>
        <FormLabel htmlFor="Hours per Day"> Hours Per Day </FormLabel>{" "}
      </GridItem>{" "}
      <GridItem px={4}>
        <FormControl>
          <NumberInput
            value={billing.billingHoursPerDay}
            precision={1}
            step={1}
            onChange={(valueString) => updateHours(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>{" "}
          </NumberInput>{" "}
          <FormHelperText> </FormHelperText>{" "}
        </FormControl>{" "}
      </GridItem>{" "}
      <GridItem p={4}>
        <FormLabel htmlFor="Set Your Tax Rate"> Tax Rate </FormLabel>{" "}
      </GridItem>{" "}
      <GridItem px={4}>
        <FormControl>
          <NumberInput
            value={formatToPercent(billing.taxRate)}
            precision={1}
            onChange={(valueString) => updateTax(valueString)}
            max={100}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>{" "}
          </NumberInput>{" "}
          <FormHelperText> </FormHelperText>{" "}
        </FormControl>{" "}
      </GridItem>{" "}
      <GridItem p={4}>
        <FormLabel htmlFor="Set Your Tax Rate"> Currency </FormLabel>{" "}
      </GridItem>{" "}
      <GridItem px={4}>
        <FormControl>
          <CurrencySelector
            currencyObject={props.currencyObject}
            onChange={updateCurrency}
            selectedItem={selectedCurrency}
          />
          <FormHelperText> </FormHelperText>{" "}
        </FormControl>{" "}
      </GridItem>{" "}
    </Grid>
  );
}

export default Billing;
