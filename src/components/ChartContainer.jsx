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
import { Typography } from "@mui/material";
import TabularDataContainer from "./TabularDataContainer";

const ChartContainer = ({ selectedStackId, mapToggleState, stackIdData}) => {
  const [consumptionState, setConsumptionState] = useState(null);
  const [aiForecastToggle, finalForecastToggle] = mapToggleState;
  const [forecastData, setForecastData]=useState({
    aiForecastData: [],
    previousQtrFinalForecast: [],
    finalForecastData: []
  });

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

      setForecastData(prev=>({...prev, aiForecastData, previousQtrFinalForecast, finalForecastData}));

      const consumptionValues = consumptionData.map((ele, i) => {
        const year = 2023 + Math.floor(i / 4);
        const quarter = `Q${(i % 4) + 1} ${year}`;
        return {
          quarter,
          consumption: ele,
        };
      });

      const mergedValues = consumptionValues.map((item, index) => ({
        ...item,
        finalForecastData: finalForecastData[index],
        finalForecastHistoricalData: finalForecastHistoricalData[index],
        aiForecastData: aiForecastData[index],
        aiForecastHistoricalData: aiForecastDataHistorical[index],
        previousQtrFinalForecast: previousQtrFinalForecast[index],
      }));

      setConsumptionState(mergedValues);
    }
  }, [selectedStackId]);

  return (
    <>
      <section className="chartContainer">
        <div className="graphPlotter">
          <div className="graph--title-divider" style={{ display: "flex" }}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                marginLeft: "10px",
                fontWeight: "bold",
              }}
            >
              HISTORICAL
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#42f5b3",
                marginLeft: "10px",
                fontWeight: "bold",
              }}
            >
              FORECAST
            </Typography>
          </div>
          <ResponsiveContainer width="100%" height={330}>
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
                // White y-axis line
                        label={{
                          value: "Values (ft. thousands)",
                          angle: -90,
                          position: "insideLeft",
                          offset: 0, // Adjust the offset value
                          fill: "white", // White label text
                          dy: 20 // Adjust the vertical position
                        }}
                        tickFormatter={(value) => `${value / 1000}`} // Format y-axis values in thousands
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  border: "1px solid #555",
                  color: "white",
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value / 1000}k`} // Format tooltip values in thousands
              />
              <Legend
                wrapperStyle={{ color: "white", paddingTop: "20px" }} // White legend text with padding
              />
              {/* Dotted Divider between Q6 and Q7 */}
              <ReferenceLine
                x={"Q3 2024"} // Position between Q6 and Q7
                stroke="white" // Color of the divider
                strokeDasharray="5 5" // Dotted line
                strokeWidth={1} // Thickness of the line
              />
              {/* Consumption Line */}
              <Line
                type="linear"
                dataKey="consumption"
                stroke="#87ceeb" // Sky blue line
                strokeWidth={2}
                dot={{ fill: "#ffcc00", r: 5 }} // Yellow dots
                activeDot={{ r: 8 }} // Larger dot on hover
                name="Actual Consumption"
              />
              {/* Final Forecast Data (Dotted Line) */}
              {finalForecastToggle && (
                <Line
                  type="linear"
                  dataKey="finalForecastData"
                  stroke="#00ffcc" // Cyan line
                  strokeWidth={2}
                  dot={{ fill: "#00ffcc", r: 5 }} // Cyan dots
                  activeDot={{ r: 8 }} // Larger dot on hover
                  name="Final Forecast (Dotted)"
                  strokeDasharray="5 5" // Dotted line
                />
              )}
              {/* Historical Final Forecast Data (Solid Line) */}
              {finalForecastToggle && (
                <Line
                  type="linear"
                  dataKey="finalForecastHistoricalData"
                  stroke="#00ffcc" // Cyan line
                  strokeWidth={2}
                  dot={{ fill: "#00ffcc", r: 5 }} // Cyan dots
                  activeDot={{ r: 8 }} // Larger dot on hover
                  name="Historical Final Forecast (Solid)"
                  strokeDasharray="0" // Solid line
                />
              )}
              {/* AI Forecast Data (Dashed Line) */}
              {aiForecastToggle && (
                <Line
                  type="linear"
                  dataKey="aiForecastData"
                  stroke="#00ff00" // Green line
                  strokeWidth={2}
                  dot={{ fill: "#00ff00", r: 5 }} // Green dots
                  activeDot={{ r: 8 }} // Larger dot on hover
                  name="AI Forecast (Dashed)"
                  strokeDasharray="10 5" // Dashed line
                />
              )}
              {/* Historical AI Forecast Data (Solid Line) */}
              {aiForecastToggle && (
                <Line
                  type="linear"
                  dataKey="aiForecastHistoricalData"
                  stroke="#00ff00" // Green line
                  strokeWidth={2}
                  dot={{ fill: "#00ff00", r: 5 }} // Green dots
                  activeDot={{ r: 8 }} // Larger dot on hover
                  name="Historical AI Forecast (Solid)"
                  strokeDasharray="0" // Solid line
                />
              )}
              {/* Previous Quarter Final Forecast (Dotted Line) */}
              <Line
                type="linear"
                dataKey="previousQtrFinalForecast"
                stroke="#ff69b4" // Pink line
                strokeWidth={2}
                dot={{ fill: "#ff69b4", r: 5 }} // Pink dots
                activeDot={{ r: 8 }} // Larger dot on hover
                name="Previous Quarter Final Forecast (Dotted)"
                strokeDasharray="5 5" // Dotted line
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="tableDataContainer">
        <TabularDataContainer forecastData={forecastData}/>
      </section>
    </>
  );
};

export default ChartContainer;
