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
} from "@chakra-ui/react";
import moment from "moment";
import { BillingContext } from "../utils/BillingContext";
import { formatToCurrency } from "../utils/helpers";

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

  return (
    <>
      <Heading as="h2" size="lg">
        <Text
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
        >
          {endOfMonth.format("MMMM")} numbers
        </Text>
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} p={14}>
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel>Days Remaing in {moment().format("MMMM")}</StatLabel>
            <StatNumber>{remainingDays}</StatNumber>
            <StatHelpText>
              {moment().format("DD-MM-YYYY")} -{" "}
              {endOfMonth.format("DD-MM-YYYY")}
            </StatHelpText>
          </Stat>
        </GridItem>
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel>Work days in {moment().format("MMMM")}</StatLabel>
            <StatNumber>{remainingWorkDays}</StatNumber>
            <StatHelpText>
              {moment().format("DD-MM-YYYY")} -{" "}
              {endOfMonth.format("DD-MM-YYYY")}
            </StatHelpText>
          </Stat>
        </GridItem>
        <GridItem bg="gray.100" p={4} borderRadius="md">
          <Stat>
            <StatLabel>
              Potential billing in {moment().format("MMMM")}
            </StatLabel>
            <StatNumber>
              {formatToCurrency(billing * 7.5 * remainingWorkDays)}
            </StatNumber>
            <StatHelpText>
              {moment().format("DD-MM-YYYY")} -{" "}
              {endOfMonth.format("DD-MM-YYYY")}
            </StatHelpText>
          </Stat>
        </GridItem>
      </Grid>
      <Heading as="h1" size="lg" py={2}>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Remaining {monthsRemaining} months for {moment().format("YYYY")}
        </Text>
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} p={14}>
        {remaingMonthsData.map((month) => (
          <>
            <GridItem bg="pink.100" p={4} borderRadius="md" bg="green.100">
              <Heading as="h2" size="lg">
                {month.month}
              </Heading>
              <Stat>
                <StatNumber>{month.remainingWorkDays} billable days</StatNumber>
                <StatNumber>
                  {formatToCurrency(billing * 7.5 * month.remainingWorkDays)}
                </StatNumber>
                <StatHelpText></StatHelpText>
              </Stat>
            </GridItem>
          </>
        ))}
      </Grid>
    </>
  );
}

export default Cards;
