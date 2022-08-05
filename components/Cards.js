import React, { useContext } from "react";
import {
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
import moment from "moment";
import { BillingContext } from "../utils/BillingContext";
import { formatToCurrency } from "../utils/helpers";
import _, { map } from "underscore";

function Cards(props) {
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

  const remaingMonthsBilling = _.reduce(
    remaingMonthsData,
    function (memoizer, value) {
      return memoizer + value.remainingWorkDays;
    },
    0
  );

  return (
    <>
      <Heading as="h2" size="lg">
        <Text
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
        >
          {endOfMonth.format("MMMM")}
          numbers{" "}
        </Text>{" "}
      </Heading>{" "}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} py={4} px={14}>
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel> Days Remaing in {moment().format("MMMM")} </StatLabel>{" "}
            <StatNumber> {remainingDays} </StatNumber>{" "}
            <StatHelpText> </StatHelpText>{" "}
          </Stat>{" "}
        </GridItem>{" "}
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel> Work days in {moment().format("MMMM")} </StatLabel>{" "}
            <StatNumber> {remainingWorkDays} </StatNumber>{" "}
            <StatHelpText> </StatHelpText>{" "}
          </Stat>{" "}
        </GridItem>{" "}
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel> After tax </StatLabel>{" "}
            <StatNumber>
              {" "}
              {formatToCurrency(
                billing.billingRate *
                  billing.billingHoursPerDay *
                  remainingWorkDays -
                  billing.billingRate *
                    billing.billingHoursPerDay *
                    remainingWorkDays *
                    billing.taxRate
              )}{" "}
            </StatNumber>{" "}
            <StatHelpText>
              Before Tax:{" "}
              {formatToCurrency(
                billing.billingRate *
                  billing.billingHoursPerDay *
                  remainingWorkDays
              )}{" "}
            </StatHelpText>{" "}
          </Stat>{" "}
        </GridItem>{" "}
      </Grid>{" "}
      <Flex gap={6} py={8} px={14} w={["100%", 900, 900]}>
        <Heading
          align="center"
          as="h1"
          size="lg"
          py={2}
          px={0}
          color="gray.600"
        >
          <Text as="span">
            If you continue to work at the same pace for the remaining{" "}
          </Text>{" "}
          <Text as="span" color="blue.300">
            {" "}
            {monthsRemaining}{" "}
          </Text>{" "}
          <Text as="span"> months( </Text>{" "}
          <Text as="span" color="blue.300">
            {" "}
            {remaingMonthsBilling}
            days{" "}
          </Text>{" "}
          <Text as="span"> ) in </Text>{" "}
          <Text as="span" color="blue.300">
            {" "}
            {moment().format("YYYY")}{" "}
          </Text>{" "}
          <Text as="span">
            {" "}
            , <br /> you have the potential to earn{" "}
          </Text>{" "}
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
                  billing.taxRate
            )}{" "}
          </Text>{" "}
          <Text as="span"> after tax😀 </Text>{" "}
        </Heading>{" "}
      </Flex>{" "}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} p={14}>
        {" "}
        {remaingMonthsData.map((month) => (
          <>
            <GridItem
              bg="pink.100"
              p={4}
              borderRadius="md"
              bg="green.100"
              key={month.month + Math.random()}
            >
              <Heading as="h2" size="lg">
                {" "}
                {month.month}{" "}
              </Heading>{" "}
              <Stat>
                <StatNumber>
                  {" "}
                  {month.remainingWorkDays}
                  billable days{" "}
                </StatNumber>{" "}
                <StatNumber>
                  <Text fontSize="sm" as="span">
                    After tax:
                  </Text>{" "}
                  {formatToCurrency(
                    billing.billingRate *
                      billing.billingHoursPerDay *
                      month.remainingWorkDays -
                      billing.billingRate *
                        billing.billingHoursPerDay *
                        month.remainingWorkDays *
                        billing.taxRate
                  )}{" "}
                </StatNumber>{" "}
                <StatHelpText>
                  Before Tax:{" "}
                  {formatToCurrency(
                    billing.billingRate *
                      billing.billingHoursPerDay *
                      month.remainingWorkDays
                  )}{" "}
                </StatHelpText>{" "}
              </Stat>{" "}
            </GridItem>{" "}
          </>
        ))}{" "}
      </Grid>{" "}
    </>
  );
}

export default Cards;
