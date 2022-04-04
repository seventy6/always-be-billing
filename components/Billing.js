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
  
//const formatToCurrency = (val) => `$` + val

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} p={0}>
      <GridItem p={4}>
        <FormControl>
          <VisuallyHidden><FormLabel htmlFor="Billing Rate">£P/H</FormLabel></VisuallyHidden>
          <NumberInput value={formatToCurrency(parseCurrencyToNumber(billing))} precision={2} step={0.5} onChange={(valueString) => setBilling(parseCurrencyToNumber(valueString))}>
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
