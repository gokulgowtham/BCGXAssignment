import React, { useEffect } from "react";
import { getForecastDataByCity } from "../mockApi";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const actualUnit = payload[0].payload.actualConsumptionUnit; // Get actual unit
    const forecastUnit = payload[0].payload.forecastUnit; // Get forecast unit
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{`Month: ${label}`}</p>
          <p style={{ margin: 0 }}>{`Actual: ${payload[0].value}${actualUnit || '%'}`}</p>
          <p style={{ margin: 0 }}>{`Forecast: ${payload[1].value}${forecastUnit || '%'}`}</p>
        </div>
      );
    }
    return null;
  };

const MiniatureChart = ({ data, data1Key, data2Key}) => {


  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        {/* X-axis for months */}
        <XAxis dataKey="Quarter" tick={{ fontSize: 10 }} />
        {/* Y-axis for values */}
        {/* Tooltip to show details on hover */}
        <Tooltip content={<CustomTooltip />} position={{ y: -50 }} />
        {/* Solid line for actual consumption */}
        <Line
          type="monotone"
          dataKey={data1Key}
          stroke="#FF6347"
          strokeWidth={2}
          dot={{ r: 2 }} // Small dots for data points
          name="Actual Consumption"
        />
        {/* Dashed line for forecast */}
        <Line
          type="monotone"
          dataKey={data2Key}
           stroke="#1E90FF"
          strokeWidth={2}
          strokeDasharray="5 5" // Dashed line
          dot={false} // No dots for the dashed line
          name="Forecast"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniatureChart;
