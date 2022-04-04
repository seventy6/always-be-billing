import React, { useContext } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
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

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} p={14}>
      <GridItem bg="gray.100" p={4}>
        <Stat>
          <StatLabel>Days Remaing in {moment().format('MMMM')}</StatLabel>
          <StatNumber>{remainingDays}</StatNumber>
          <StatHelpText>
            {moment().format("DD-MM-YYYY")} - {endOfMonth.format("DD-MM-YYYY")}
          </StatHelpText>
        </Stat>
      </GridItem>
      <GridItem bg="gray.100" p={4}>
        <Stat>
          <StatLabel>Work days in {moment().format('MMMM')}</StatLabel>
          <StatNumber>{remainingWorkDays}</StatNumber>
          <StatHelpText>
            {moment().format("DD-MM-YYYY")} - {endOfMonth.format("DD-MM-YYYY")}
          </StatHelpText>
        </Stat>
      </GridItem>
      <GridItem bg="gray.100" p={4}>
        <Stat>
          <StatLabel>Potential billing in {moment().format('MMMM')}</StatLabel>
          <StatNumber>{formatToCurrency((billing * 7.5) * remainingWorkDays)}</StatNumber>
          <StatHelpText>
            {moment().format("DD-MM-YYYY")} - {endOfMonth.format("DD-MM-YYYY")}
          </StatHelpText>
        </Stat>
      </GridItem>
    </Grid>
  );
}

export default Cards;
