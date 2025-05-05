import React, { useContext, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  useBreakpointValue,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

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

function Billing(props) {
  const columns = useBreakpointValue({ base: 1, md: 2 });
  const [billing, setBilling] = useContext(BillingContext);
  const [selectedCurrency, setSelectedCurrency] = useState(
    getCurrencySelectorFromCode(billing.currency)
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
      billingRate: billing.billingRate,
      billingHoursPerDay: billing.billingHoursPerDay,
      taxRate: billing.taxRate,
      currency: val.value,
    });
    localStorage.setItem("currency", val.value);
    setSelectedCurrency(getCurrencySelectorFromCode(val.value));
  };
  //const formatToCurrency = (val) => `$` + val

  return (
    <SimpleGrid columns={columns} gap={6} px={1}>
      <GridItem p={4}>
        <FormLabel htmlFor="Set Your Billing Rate">
          Billing Rate <br />
          <Text as="i" fontSize="sm">
            {" "}
            (hourly)
          </Text>
        </FormLabel>{" "}
      </GridItem>{" "}
      <GridItem p={4}>
        <FormControl>
          <NumberInput
            value={formatToCurrency(
              billing.billingRate,
              getCurrencyFromCode(billing.currency)
            )}
            precision={0}
            step={5.0}
            onChange={(valueString) => updateRate(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText></FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem px={4}>
        <FormLabel htmlFor="Hours per Day"> Hours Per Day </FormLabel>
      </GridItem>
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
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText> </FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem p={4}>
        <FormLabel htmlFor="Set Your Tax Rate"> Tax Rate </FormLabel>
      </GridItem>
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
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText> </FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem p={4}>
        <FormLabel htmlFor="Set Your Tax Rate"> Currency </FormLabel>
      </GridItem>
      <GridItem px={4}>
        <FormControl>
          <CurrencySelector
            currencyObject={props.currencyObject}
            onChange={updateCurrency}
            selectedItem={selectedCurrency}
          />
          <FormHelperText> </FormHelperText>
        </FormControl>
      </GridItem>
    </SimpleGrid>
  );
}

export default Billing;
