import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Chart = data => {
  console.log(data);
  return (
    <LineChart
      width={1500}
      height={600}
      data={data.data}
      margin={{
        top: 125,
        right: 100,
        left: 155,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Date" />
      <YAxis
        label={{ value: "Clicks", angle: -90, position: "left", offset: 50 }}
        yAxisId="left"
      />
      <YAxis
        label={{
          value: "Impressions",
          angle: 90,
          position: "right",
          offset: 50
        }}
        yAxisId="right"
        orientation="right"
      />
      {/* <Tooltip /> */}
      <Legend />
      <Line
        yAxisId="left"
        dot={false}
        activeDot={false}
        type="monotone"
        dataKey="Clicks"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line
        dot={false}
        activeDot={false}
        yAxisId="right"
        type="monotone"
        dataKey="Impressions"
        stroke="#82ca9d"
      />
    </LineChart>
  );
};
export default Chart;
