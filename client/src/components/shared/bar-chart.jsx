"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { month: "Enero", value: 350000 },
  { month: "Febrero", value: 1080000 },
  { month: "Marzo", value: 510000 },
  { month: "Abril", value: 420000 },
  { month: "Mayo", value: 530000 },
  { month: "Junio", value: 600000 },
  { month: "Julio", value: 970000 },
  { month: "Agosto", value: 520000 },
  { month: "Septiembre", value: 590000 },
  { month: "Octubre", value: 0 },
  { month: "Noviembre", value: 0 },
  { month: "Diciembre", value: 0 },
];

const chartConfig = {
  value: {
    label: "Gasto",
    color: "#005e99",
  },
};

export function Component() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" fill="#005e99" radius={6} />
      </BarChart>
    </ChartContainer>
  );
}
