import React, { useContext } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  VisuallyHidden,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { BillingContext } from "../utils/BillingContext";
import { formatToCurrency, parseCurrencyToNumber } from "../utils/helpers";

function Billing(props) {
  const [billing, setBilling] = useContext(BillingContext);
  const updateRate = (val) => {
    setBilling(parseCurrencyToNumber(val));
    localStorage.setItem('billingRate', parseCurrencyToNumber(val))
  };
  //const formatToCurrency = (val) => `$` + val

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} py={1} my={4} bg="whiteAlpha.300" borderRadius='md'  >
      <GridItem p={4}>
          <FormLabel htmlFor="Set Your Billing Rate">Billing Rate</FormLabel>
      </GridItem>
      <GridItem p={4}>
        <FormControl>
          <NumberInput
            value={formatToCurrency(parseCurrencyToNumber(billing))}
            precision={2}
            step={10.0}
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
    </Grid>
  );
}

export default Billing;
