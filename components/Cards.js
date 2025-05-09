import React, { useContext } from "react";
import {
  SimpleGrid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  Heading,
  VStack,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import moment from "moment";
import { BillingContext } from "../utils/BillingContext";
import { formatToCurrency } from "../utils/helpers";
import { getCurrencyFromCode } from "../data/currencies";
import _, { map } from "underscore";

function Cards(props) {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const endOfMonth = moment().endOf("month");
  const today = moment();
  const remainingDays = endOfMonth.diff(today, "days");

  function getBusinessDays(startDate, endDate) {
    var startDateMoment = moment(startDate);
    var endDateMoment = moment(endDate);
    var days = Math.round(
      startDateMoment.diff(endDateMoment, "days") -
        (startDateMoment.diff(endDateMoment, "days") / 7) * 2
    );
    if (endDateMoment.day() === 6) {
      days--;
    }
    if (startDateMoment.day() === 7) {
      days--;
    }
    return days;
  }
  const remainingWorkDays = getBusinessDays(endOfMonth, today);

  const [billing] = useContext(BillingContext);

  const currentMonthNumber = endOfMonth.format("M");
  const monthsRemaining = 12 - currentMonthNumber;
  const remaingMonthsData = [];

  for (let index = currentMonthNumber; index < 13; index++) {
    const daysInMonth = moment(
      moment().format("YYYY") + "-" + index,
      "YYYY-MM"
    ).daysInMonth();
    remaingMonthsData.push({
      daysInMonth,
      month: moment(moment().format("YYYY") + "-" + index, "YYYY-MM").format(
        "MMMM"
      ),
      remainingWorkDays: getBusinessDays(
        moment(
          moment().format("YYYY") + "-" + index + "-01",
          "YYYY-MM-DD"
        ).endOf("month"),
        moment(
          moment().format("YYYY") + "-" + index + "-01",
          "YYYY-MM-DD"
        ).startOf("month")
      ),
    });
  }
  remaingMonthsData[0].remainingWorkDays = remainingWorkDays;
  console.log("remaingMonthsData", remaingMonthsData);
  const remaingMonthsBilling = _.reduce(
    remaingMonthsData,
    function (memoizer, value) {
      return memoizer + value.remainingWorkDays;
    },
    0
  );

  return (
    <VStack spacing={10}>
      <Heading as="h2" size="lg">
        <Text
          //bgGradient="linear(to-r, #7928CA, #FF0080)"
          //bgClip="text"
          color="teal.300"
          fontWeight="extrabold"
          fontFamily="'Hanalei Fill', cursive"
        >
          {endOfMonth.format("MMMM")} numbers{" "}
        </Text>
      </Heading>
      <SimpleGrid columns={columns} gap={6} px={1}>
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel> Days Remaining in {moment().format("MMMM")} </StatLabel>
            <StatNumber> {remainingDays} </StatNumber>
            <StatHelpText> </StatHelpText>
          </Stat>
        </GridItem>
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel> Work days in {moment().format("MMMM")} </StatLabel>
            <StatNumber> {remainingWorkDays} </StatNumber>
            <StatHelpText> </StatHelpText>
          </Stat>
        </GridItem>
        <GridItem bg="teal.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel> After tax </StatLabel>
            <StatNumber>
              {" "}
              {formatToCurrency(
                billing.billingRate *
                  billing.billingHoursPerDay *
                  remainingWorkDays -
                  billing.billingRate *
                    billing.billingHoursPerDay *
                    remainingWorkDays *
                    billing.taxRate,
                getCurrencyFromCode(billing.currency)
              )}{" "}
            </StatNumber>
            <StatHelpText>
              Before Tax:{" "}
              {formatToCurrency(
                billing.billingRate *
                  billing.billingHoursPerDay *
                  remainingWorkDays,
                getCurrencyFromCode(billing.currency)
              )}{" "}
            </StatHelpText>
          </Stat>
        </GridItem>
      </SimpleGrid>
      <Box maxW="34rem">
        <Heading align="center" as="h1" size="md" color="gray.600" fontFamily="'Hanalei Fill', cursive">
          <Text as="span">
            If you continue to work at the same pace for the remaining{" "}
          </Text>
          <Text as="span" color="blue.300">
            {" "}
            {monthsRemaining}{" "}
          </Text>{" "}
          <Text as="span"> months / </Text>
          <Text as="span" color="blue.300">
            {remaingMonthsBilling}
          </Text>
          <Text as="span"> days in </Text>
          <Text as="span" color="blue.300">
            {" "}
            {moment().format("YYYY")}{" "}
          </Text>
          <Text as="span">
            {" "}
            , <br /> you have the potential to earn{" "}
          </Text>
          <Text
            as="span"
            bgGradient="linear(to-r, #7928CA, #FF0080)"
            bgClip="text"
            fontWeight="extrabold"
          >
            {formatToCurrency(
              remaingMonthsBilling *
                billing.billingHoursPerDay *
                billing.billingRate -
                remaingMonthsBilling *
                  billing.billingHoursPerDay *
                  billing.billingRate *
                  billing.taxRate,
              getCurrencyFromCode(billing.currency)
            )}
          </Text>
          <Text as="span"> after tax😀 </Text>
        </Heading>
      </Box>
      <SimpleGrid columns={columns} gap={6} px={1} pb={10}>
        {" "}
        {remaingMonthsData.map((month, index) => (
          <GridItem p={4} borderRadius="md" bg="gray.100" key={index}>
            <Heading as="h2" size="lg" fontFamily="'Hanalei Fill', cursive">
              {" "}
              {month.month}
            </Heading>
            <Stat>
              <StatNumber> {month.remainingWorkDays} billable days </StatNumber>
              <StatNumber>
                <Text fontSize="sm" as="span">
                  After tax:
                </Text>
                {formatToCurrency(
                  billing.billingRate *
                    billing.billingHoursPerDay *
                    month.remainingWorkDays -
                    billing.billingRate *
                      billing.billingHoursPerDay *
                      month.remainingWorkDays *
                      billing.taxRate,
                  getCurrencyFromCode(billing.currency)
                )}{" "}
              </StatNumber>
              <StatHelpText>
                Before Tax:{" "}
                {formatToCurrency(
                  billing.billingRate *
                    billing.billingHoursPerDay *
                    month.remainingWorkDays,
                  getCurrencyFromCode(billing.currency)
                )}{" "}
              </StatHelpText>
            </Stat>
          </GridItem>
        ))}{" "}
      </SimpleGrid>
    </VStack>
  );
}

export default Cards;
