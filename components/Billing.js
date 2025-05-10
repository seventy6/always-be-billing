import React, { useContext, useState, useEffect } from "react";
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
  Badge,
  Flex,
  Tooltip,
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
  const [exchangeRateData, setExchangeRateData] = useState({
    loading: false,
    error: null,
    todayRate: null,
    yesterdayRate: null,
    percentChange: null,
  });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      if (!billing.currency) return;
      
      setExchangeRateData(prev => ({ ...prev, loading: true, error: null }));
      
      if (billing.currency === 'USD') {
        setExchangeRateData({
          loading: false,
          error: null,
          todayRate: 1,
          yesterdayRate: 1,
          percentChange: 0,
        });
        return;
      }
      
      try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const todayResponse = await fetch(
          `https://api.frankfurter.app/latest?from=USD&to=${billing.currency}`
        );
        
        console.log('Today API response status:', todayResponse.status);
        
        if (!todayResponse.ok) {
          throw new Error('Failed to fetch today\'s exchange rates');
        }
        
        const todayData = await todayResponse.json();
        console.log('Today API response data:', todayData);
        
        const yesterdayResponse = await fetch(
          `https://api.frankfurter.app/${yesterdayStr}?from=USD&to=${billing.currency}`
        );
        
        console.log('Yesterday API response status:', yesterdayResponse.status);
        
        if (!yesterdayResponse.ok) {
          throw new Error('Failed to fetch yesterday\'s exchange rates');
        }
        
        const yesterdayData = await yesterdayResponse.json();
        console.log('Yesterday API response data:', yesterdayData);
        
        if (todayData.rates && yesterdayData.rates) {
          const todayRate = todayData.rates[billing.currency];
          const yesterdayRate = yesterdayData.rates[billing.currency];
          const percentChange = ((todayRate - yesterdayRate) / yesterdayRate) * 100;
          
          console.log('Exchange rate data:', {
            todayRate,
            yesterdayRate,
            percentChange
          });
          
          setExchangeRateData({
            loading: false,
            error: null,
            todayRate,
            yesterdayRate,
            percentChange,
          });
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setExchangeRateData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch exchange rates',
        }));
      }
    };
    
    fetchExchangeRates();
  }, [billing.currency]);

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
            min={0.5}
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
            min={0.5}
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
            min={0.5}
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
          {exchangeRateData.loading ? (
            <FormHelperText>Loading exchange rates...</FormHelperText>
          ) : exchangeRateData.error ? (
            <FormHelperText color="red.500">{exchangeRateData.error}</FormHelperText>
          ) : exchangeRateData.percentChange !== null ? (
            <FormHelperText>
              <Flex alignItems="center" mt={1}>
                <Text mr={2}>Exchange rate:</Text>
                <Tooltip 
                  label={`Yesterday: ${exchangeRateData.yesterdayRate?.toFixed(4)}, Today: ${exchangeRateData.todayRate?.toFixed(4)}`}
                  placement="top"
                >
                  <Badge 
                    colorScheme={exchangeRateData.percentChange > 0 ? "green" : exchangeRateData.percentChange < 0 ? "red" : "gray"}
                    display="flex"
                    alignItems="center"
                  >
                    {exchangeRateData.percentChange > 0 ? "↑" : exchangeRateData.percentChange < 0 ? "↓" : "–"}
                    {Math.abs(exchangeRateData.percentChange).toFixed(2)}% from yesterday
                  </Badge>
                </Tooltip>
              </Flex>
            </FormHelperText>
          ) : (
            <FormHelperText> </FormHelperText>
          )}
        </FormControl>
      </GridItem>
    </SimpleGrid>
  );
}

export default Billing;
