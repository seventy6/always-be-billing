import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { BillingContext } from "../utils/BillingContext";
import { formatToCurrency } from "../utils/helpers";
import { getCurrencyFromCode } from "../data/currencies";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

function HistoricalTracking() {
  const [billing] = useContext(BillingContext);
  const [timeframe, setTimeframe] = useState("monthly");
  
  const [historicalData, setHistoricalData] = useState(() => {
    const savedData = localStorage.getItem("historicalData");
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    const mockData = generateMockData();
    localStorage.setItem("historicalData", JSON.stringify(mockData));
    return mockData;
  });

  function generateMockData() {
    const data = [];
    const currentMonth = moment().month();
    const currentYear = moment().year();
    
    for (let i = 11; i >= 0; i--) {
      const date = moment().subtract(i, 'months');
      const month = date.format('MMM');
      const year = date.format('YYYY');
      
      const workDays = 20; // Average work days per month
      const projectedEarnings = billing.billingRate * billing.billingHoursPerDay * workDays;
      
      const variationFactor = 0.8 + Math.random() * 0.4; // Between 80% and 120% of projected
      const actualEarnings = projectedEarnings * variationFactor;
      
      data.push({
        month,
        year,
        date: date.format('YYYY-MM'),
        projectedEarnings,
        actualEarnings,
        workDays,
        hoursWorked: billing.billingHoursPerDay * workDays * variationFactor,
      });
    }
    
    return data;
  }

  const calculateMetrics = () => {
    const totalActual = historicalData.reduce((sum, item) => sum + item.actualEarnings, 0);
    const totalProjected = historicalData.reduce((sum, item) => sum + item.projectedEarnings, 0);
    const totalHours = historicalData.reduce((sum, item) => sum + item.hoursWorked, 0);
    const totalDays = historicalData.reduce((sum, item) => sum + item.workDays, 0);
    
    const averageDailyEarnings = totalActual / totalDays;
    const averageHourlyRate = totalActual / totalHours;
    const performanceRatio = totalActual / totalProjected;
    
    return {
      totalActual,
      totalProjected,
      averageDailyEarnings,
      averageHourlyRate,
      performanceRatio,
    };
  };

  const metrics = calculateMetrics();

  const getFilteredData = () => {
    switch (timeframe) {
      case 'weekly':
        return historicalData.slice(-4);
      case 'monthly':
        return historicalData;
      case 'quarterly':
        const quarterlyData = [];
        for (let i = 0; i < 4; i++) {
          const quarterMonths = historicalData.slice(i * 3, (i + 1) * 3);
          if (quarterMonths.length > 0) {
            const quarterData = {
              month: `Q${i + 1}`,
              year: quarterMonths[0].year,
              projectedEarnings: quarterMonths.reduce((sum, item) => sum + item.projectedEarnings, 0),
              actualEarnings: quarterMonths.reduce((sum, item) => sum + item.actualEarnings, 0),
            };
            quarterlyData.push(quarterData);
          }
        }
        return quarterlyData;
      default:
        return historicalData;
    }
  };

  const filteredData = getFilteredData();

  const formatTooltipValue = (value) => {
    return formatToCurrency(value, getCurrencyFromCode(billing.currency));
  };

  return (
    <div className="flex flex-col space-y-10">
      <h2 className="text-2xl font-bold">
        <span className="text-primary font-extrabold">
          Historical Tracking &amp; Analytics
        </span>
      </h2>

      <div className="flex w-full justify-end mb-4">
        <Select 
          value={timeframe} 
          onValueChange={setTimeframe}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="projectedEarnings"
              name="Projected Earnings"
              stroke="hsl(var(--chart-1))"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="actualEarnings"
              name="Actual Earnings"
              stroke="hsl(var(--chart-2))"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3 className="text-xl font-semibold self-start">
        Performance Metrics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Average Daily Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatToCurrency(
                metrics.averageDailyEarnings,
                getCurrencyFromCode(billing.currency)
              )}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Per working day</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Effective Hourly Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatToCurrency(
                metrics.averageHourlyRate,
                getCurrencyFromCode(billing.currency)
              )}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Based on actual hours worked</p>
          </CardContent>
        </Card>
        
        <Card className={metrics.performanceRatio >= 1 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}>
          <CardHeader>
            <CardTitle>Performance Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {(metrics.performanceRatio * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {metrics.performanceRatio >= 1 
                ? "Exceeding projections!" 
                : "Below projections"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earnings" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="earnings">Earnings Comparison</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={formatTooltipValue}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="projectedEarnings" name="Projected" fill="hsl(var(--chart-1))" />
                <Bar dataKey="actualEarnings" name="Actual" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 w-full">
            {filteredData.map((month, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{month.month} {month.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Projected</h4>
                    <p className="text-xl font-bold">
                      {formatToCurrency(
                        month.projectedEarnings,
                        getCurrencyFromCode(billing.currency)
                      )}
                    </p>
                  </div>
                  <Separator className="my-2" />
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Actual</h4>
                    <p className="text-xl font-bold">
                      {formatToCurrency(
                        month.actualEarnings,
                        getCurrencyFromCode(billing.currency)
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {((month.actualEarnings / month.projectedEarnings) * 100).toFixed(1)}% of projection
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HistoricalTracking;
