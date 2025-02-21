"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { useColorModeValue } from "@chakra-ui/react";

interface ChartData {
  name: string;
  value: number;
}

interface ChartsBar {
  data: ChartData[];
  xAxisKey?: string;
  yAxisKey?: string;
}

/**
 * @param data
 * data on the chart
 * parse the data to the chart
 * it needs to be an array of objects with name and value
 * @example 
 * [
 *  { name: 'A', value: 10 },
 *  { name: 'B', value: 20 },
 * ]
 * 
 * @param xAxisKey 
 * @type string
 * @optional
 * x axis key is the key of the object that will be used as the x axis
 * @example key 'name' from data array
 * 
 * @param yAxisKey 
 * @type string
 * @optional
 * y axis key is the key of the object that will be used as the y axis
 * @example key 'value' from data array
 * 
 * @returns component chart type 'bar'
 */

export default function ChartsBar({
  data,
  xAxisKey,
  yAxisKey,
}: ChartsBar) {
  const tooltipBg = useColorModeValue("#fff", "#1a202c");
  const tooltipColor = useColorModeValue("#000", "#fff");

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: tooltipBg,
            color: tooltipColor,
            padding: "10px",
            borderRadius: "5px",
            border: `1px solid ${tooltipColor}`,
          }}
        >
          <p>{label}</p>
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  };

  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={data} barSize={60}>
        <XAxis dataKey={xAxisKey || "name"} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={yAxisKey || "value"} fill="#1a55e3" />
      </BarChart>
    </ResponsiveContainer>
  )
}