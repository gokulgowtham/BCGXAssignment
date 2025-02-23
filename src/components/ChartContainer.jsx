import React, { useEffect, useState } from "react";
import "./ChartContainer.scss";
import { getPlotValues } from "../mockApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const ChartContainer = ({ selectedStackId }) => {
  const [consumptionState, setConsumptionState] = useState(null);
  useEffect(() => {
    if (selectedStackId) {
      const {
        consumptionData,
        finalForecastHistoricalData,
        finalForecastData,
        aiForecastData,
        aiForecastDataHistorical,
        previousQtrFinalForecast,
      } = getPlotValues(selectedStackId);

      const consumptionValues = consumptionData.map((ele, i) => ({
        quarter: `Q${i + 1}`,
        consumption: ele,
      }));

      const mergedValues = consumptionValues.map((item, index) => ({
        ...item,
        finalForecastData: finalForecastData[index],
        finalForecastHistoricalData: finalForecastHistoricalData[index],
        aiForecastData: aiForecastData[index],
        aiForecastHistoricalData: aiForecastDataHistorical[index],
        previousQtrFinalForecast: previousQtrFinalForecast[index],
      }));

      setConsumptionState(mergedValues);
      debugger;

      //   setConsumptionState(consumptionValues);
    }
  }, [selectedStackId]);

  return (
    <section className="chartContainer">
      <div className="graphPlotter">
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={consumptionState}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />{" "}
            {/* Light gray grid lines */}
            <XAxis
              dataKey="quarter"
              tick={{ fill: "white" }} // White x-axis labels
              axisLine={{ stroke: "white" }} // White x-axis line
              label={{
                value: "Quarters",
                position: "insideBottom",
                offset: -10,
                fill: "white", // White label text
              }}
            />
            <YAxis
              tick={{ fill: "white" }} // White y-axis labels
              axisLine={{ stroke: "white" }} // White y-axis line
              label={{
                value: "Values (ft. thousands)",
                angle: -90,
                position: "insideLeft",
                fill: "white", // White label text
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "1px solid #555",
                color: "white",
                borderRadius: "8px",
              }}
            />
            <Legend
              wrapperStyle={{ color: "white" }} // White legend text
            />
            {/* Dotted Divider between Q6 and Q7 */}
            <ReferenceLine
              x="Q6.5" // Position between Q6 and Q7
              stroke="white" // Color of the divider
              strokeDasharray="5 5" // Dotted line
              strokeWidth={1} // Thickness of the line
            />
            {/* Consumption Line */}
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#87ceeb" // Sky blue line
              strokeWidth={2}
              dot={{ fill: "#ffcc00", r: 5 }} // Yellow dots
              activeDot={{ r: 8 }} // Larger dot on hover
              name="Actual Consumption"
            />
            {/* AI Forecast Line */}
            <Line
              type="monotone"
              dataKey="finalForecastData"
              stroke="#00ffcc" // Cyan line
              strokeWidth={2}
              dot={{ fill: "#ffcc00", r: 5 }} // Cyan dots
              activeDot={{ r: 8 }} // Larger dot on hover
              name="Final forecast data"
              strokeDasharray={"5 5"} // Solid for Q1-Q6, dotted for Q7-Q12
            />
            <Line
              type="monotone"
              dataKey="finalForecastHistoricalData"
              stroke="#00ffcc" // Cyan line
              strokeWidth={2}
              dot={{ fill: "#ffcc00", r: 5 }} // Cyan dots
              activeDot={{ r: 8 }} // Larger dot on hover
              name="Historical final forecast data"
              strokeDasharray={"0"} // Solid for Q1-Q6, dotted for Q7-Q12
            />
            <Line
              type="monotone"
              dataKey="aiForecastData"
              stroke="#00ff00" // Green line
              strokeWidth={2}
              dot={{ fill: "#ffcc00", r: 5 }} // Cyan dots
              activeDot={{ r: 8 }} // Larger dot on hover
              name="AI forecast Data"
              strokeDasharray={"5 5"} // Solid for Q1-Q6, dotted for Q7-Q12
            />
            <Line
              type="monotone"
              dataKey="aiForecastHistoricalData"
              stroke="#00ff00" // Cyan line
              strokeWidth={2}
              dot={{ fill: "#ffcc00", r: 5 }} // Cyan dots
              activeDot={{ r: 8 }} // Larger dot on hover
              name="AI Forecast historical data"
              // Solid for Q1-Q6, dotted for Q7-Q12
            />
            <Line
              type="monotone"
              dataKey="previousQtrFinalForecast"
              stroke="#ff69b4" // Pink line
              strokeWidth={2}
              dot={{ fill: "#ffcc00", r: 5 }} // Cyan dots
              activeDot={{ r: 8 }} // Larger dot on hover
              name="Previous Quarter Final Forecast"
              strokeDasharray={"0"} // Solid for Q1-Q6, dotted for Q7-Q12
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ChartContainer;
