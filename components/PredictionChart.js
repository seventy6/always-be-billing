import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import moment from "moment";
import { BillingContext } from "../utils/BillingContext";
import { formatToCurrency } from "../utils/helpers";
import { getCurrencyFromCode } from "../data/currencies";

function PredictionChart() {
  const [billing] = useContext(BillingContext);
  const currentMonthNumber = moment().endOf("month").format("M");
  const chartHeight = useBreakpointValue({ base: 300, md: 400 });
  const barColor = useColorModeValue("teal.500", "teal.300");
  const barColorAfterTax = useColorModeValue("purple.500", "purple.300");
  
  // Generate prediction data for the remaining months of the year
  const predictionData = [];
  
  for (let index = currentMonthNumber; index < 13; index++) {
    const monthMoment = moment(moment().format("YYYY") + "-" + index, "YYYY-MM");
    const monthName = monthMoment.format("MMM");
    
    // Calculate business days in the month
    const startOfMonth = monthMoment.clone().startOf("month");
    const endOfMonth = monthMoment.clone().endOf("month");
    
    let workDays;
    
    // If it's the current month, calculate remaining work days
    if (index == currentMonthNumber) {
      const today = moment();
      workDays = getBusinessDays(endOfMonth, today);
    } else {
      // For future months, calculate all work days
      workDays = getBusinessDays(endOfMonth, startOfMonth);
    }
    
    // Calculate earnings
    const beforeTax = billing.billingRate * billing.billingHoursPerDay * workDays;
    const afterTax = beforeTax - (beforeTax * billing.taxRate);
    
    predictionData.push({
      name: monthName,
      beforeTax: beforeTax,
      afterTax: afterTax,
      workDays: workDays,
    });
  }
  
  // Helper function to calculate business days between two dates
  function getBusinessDays(endDate, startDate) {
    var startDateMoment = moment(startDate);
    var endDateMoment = moment(endDate);
    var days = Math.round(
      endDateMoment.diff(startDateMoment, "days") -
        (endDateMoment.diff(startDateMoment, "days") / 7) * 2
    );
    if (endDateMoment.day() === 6) {
      days--;
    }
    if (startDateMoment.day() === 7) {
      days--;
    }
    return days;
  }
  
  // Custom tooltip to format currency values
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bg="white"
          p={3}
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <Text fontWeight="bold">{label}</Text>
          <Text color="teal.500">
            Before Tax: {formatToCurrency(payload[0].value, getCurrencyFromCode(billing.currency))}
          </Text>
          <Text color="purple.500">
            After Tax: {formatToCurrency(payload[1].value, getCurrencyFromCode(billing.currency))}
          </Text>
          <Text fontSize="sm">Work Days: {payload[0].payload.workDays}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box width="100%" mt={2}>
      <Heading as="h2" size="md" mb={2} textAlign="center">
        <Text color="teal.300" fontWeight="extrabold">
          Monthly Earnings Forecast
        </Text>
      </Heading>
      <Box
        height={chartHeight}
        width="100%"
        bg="gray.50"
        p={3}
        borderRadius="md"
        boxShadow="sm"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={predictionData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => 
                formatToCurrency(value, getCurrencyFromCode(billing.currency), true)
              } 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="beforeTax" name="Before Tax" fill={barColor} />
            <Bar dataKey="afterTax" name="After Tax" fill={barColorAfterTax} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default PredictionChart;