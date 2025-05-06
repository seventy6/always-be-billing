"use client"

import * as React from "react"
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
  ResponsiveContainer 
} from "recharts"

import { cn } from "@/lib/utils"

const chartConfig = {
  line: {
    stroke: "hsl(var(--chart-1))",
    strokeWidth: 2,
    dot: true,
    activeDot: { r: 6 },
    type: "monotone",
  },
  bar: {
    fill: "hsl(var(--chart-1))",
  },
}

const Chart = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full h-[350px]", className)} {...props} />
))
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef(({ className, ...props }, ref) => (
  <ResponsiveContainer width="100%" height="100%" ref={ref} {...props} />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef(({ className, ...props }, ref) => (
  <Tooltip
    ref={ref}
    contentStyle={{
      backgroundColor: "hsl(var(--background))",
      borderColor: "hsl(var(--border))",
      borderRadius: "var(--radius)",
    }}
    itemStyle={{
      color: "hsl(var(--foreground))",
    }}
    cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
    {...props}
  />
))
ChartTooltip.displayName = "ChartTooltip"

const ChartGrid = React.forwardRef(({ className, ...props }, ref) => (
  <CartesianGrid
    ref={ref}
    strokeDasharray="3 3"
    stroke="hsl(var(--border))"
    {...props}
  />
))
ChartGrid.displayName = "ChartGrid"

const ChartXAxis = React.forwardRef(({ className, ...props }, ref) => (
  <XAxis
    ref={ref}
    tick={{ fill: "hsl(var(--muted-foreground))" }}
    tickLine={{ stroke: "hsl(var(--border))" }}
    axisLine={{ stroke: "hsl(var(--border))" }}
    {...props}
  />
))
ChartXAxis.displayName = "ChartXAxis"

const ChartYAxis = React.forwardRef(({ className, ...props }, ref) => (
  <YAxis
    ref={ref}
    tick={{ fill: "hsl(var(--muted-foreground))" }}
    tickLine={{ stroke: "hsl(var(--border))" }}
    axisLine={{ stroke: "hsl(var(--border))" }}
    {...props}
  />
))
ChartYAxis.displayName = "ChartYAxis"

const ChartLegend = React.forwardRef(({ className, ...props }, ref) => (
  <Legend
    ref={ref}
    iconType="circle"
    wrapperStyle={{
      paddingTop: "8px",
    }}
    {...props}
  />
))
ChartLegend.displayName = "ChartLegend"

const ChartLine = React.forwardRef(({ className, index = 0, ...props }, ref) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]
  
  return (
    <Line
      ref={ref}
      type="monotone"
      stroke={colors[index % colors.length]}
      strokeWidth={2}
      activeDot={{ r: 6 }}
      {...chartConfig.line}
      {...props}
    />
  )
})
ChartLine.displayName = "ChartLine"

const ChartBar = React.forwardRef(({ className, index = 0, ...props }, ref) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]
  
  return (
    <Bar
      ref={ref}
      fill={colors[index % colors.length]}
      {...chartConfig.bar}
      {...props}
    />
  )
})
ChartBar.displayName = "ChartBar"

const ChartLineChart = React.forwardRef(({ className, children, ...props }, ref) => (
  <LineChart ref={ref} {...props}>
    {children}
  </LineChart>
))
ChartLineChart.displayName = "ChartLineChart"

const ChartBarChart = React.forwardRef(({ className, children, ...props }, ref) => (
  <BarChart ref={ref} {...props}>
    {children}
  </BarChart>
))
ChartBarChart.displayName = "ChartBarChart"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartLegend,
  ChartLine,
  ChartBar,
  ChartLineChart,
  ChartBarChart,
}
