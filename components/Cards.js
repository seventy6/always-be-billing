import React, { useContext } from "react";
import moment from "moment";
import { BillingContext } from "../utils/BillingContext";
import { formatToCurrency } from "../utils/helpers";
import { getCurrencyFromCode } from "../data/currencies";
import _ from "underscore";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col space-y-10">
      <h2 className="text-2xl font-bold">
        <span className="text-primary font-extrabold">
          {endOfMonth.format("MMMM")} numbers
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
        <Card>
          <CardHeader>
            <CardTitle>Days Remaining in {moment().format("MMMM")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{remainingDays}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Work days in {moment().format("MMMM")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{remainingWorkDays}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/10">
          <CardHeader>
            <CardTitle>After tax</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatToCurrency(
                billing.billingRate *
                  billing.billingHoursPerDay *
                  remainingWorkDays -
                  billing.billingRate *
                    billing.billingHoursPerDay *
                    remainingWorkDays *
                    billing.taxRate,
                getCurrencyFromCode(billing.currency)
              )}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Before Tax:{" "}
              {formatToCurrency(
                billing.billingRate *
                  billing.billingHoursPerDay *
                  remainingWorkDays,
                getCurrencyFromCode(billing.currency)
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <h3 className="text-center text-lg text-muted-foreground">
            <span>
              If you continue to work at the same pace for the remaining{" "}
            </span>
            <span className="text-blue-500">
              {monthsRemaining}
            </span>
            <span> months / </span>
            <span className="text-blue-500">
              {remaingMonthsBilling}
            </span>
            <span> days in </span>
            <span className="text-blue-500">
              {moment().format("YYYY")}
            </span>
            <span>
              , <br /> you have the potential to earn{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text font-extrabold">
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
            </span>
            <span> after tax😀 </span>
          </h3>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 pb-10">
        {remaingMonthsData.map((month, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{month.month}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{month.remainingWorkDays} billable days</p>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">After tax:</p>
                <p className="text-xl font-bold">
                  {formatToCurrency(
                    billing.billingRate *
                      billing.billingHoursPerDay *
                      month.remainingWorkDays -
                      billing.billingRate *
                        billing.billingHoursPerDay *
                        month.remainingWorkDays *
                        billing.taxRate,
                    getCurrencyFromCode(billing.currency)
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Before Tax:{" "}
                  {formatToCurrency(
                    billing.billingRate *
                      billing.billingHoursPerDay *
                      month.remainingWorkDays,
                    getCurrencyFromCode(billing.currency)
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Cards;
