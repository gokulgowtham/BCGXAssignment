import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./CardWidget.scss";
import MiniatureChart from "./MiniatureChart";
import { getForecastDataByCity } from "../mockApi";
import { useNavigate } from 'react-router-dom';

const TransparentCard = ({ title, forecastValue, forecastPercentage, cityId }) => {
  const [forecastState, setForecastState] = useState([]);
  const [forecastPercentageState, setForecastPercentageState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (title.length > 0) {
      const foreCastData = getForecastDataByCity(title);
      const forecastValArr = (foreCastData?.map((item) => ({
        actualConsumptionValue: parseFloat(item.actualConsumptionValue), // Extract numeric value
        forecastValue: parseFloat(item.forecastValue), // Extract numeric value
        actualConsumptionUnit: item.actualConsumptionValue.replace(
          /[0-9.]/g,
          ""
        ), // Extract unit
        forecastUnit: item.forecastValue.replace(/[0-9.]/g, ""), // Extract unit
      })) || []);
      setForecastState(forecastValArr);
      const forecastPercentageArr = (foreCastData?.map((item) => ({
        actualConsumptionPercentage: parseFloat(
          item.actualConsumptionPercentage
        ), // Extract numeric value
        forecastPercentage: parseFloat(item.forecastPercentage), // Extract numeric value
      })) || []);
      setForecastPercentageState(forecastPercentageArr);
    }
  }, [title]);


  const handleCardClick = useCallback (() => {
    navigate(`/details/${cityId}`);
  }, [cityId]);


  return (
    <section>
      <Card
        sx={{
          display: "flex",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white background
          borderRadius: "8px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.5)", // Increased box shadow
          marginBottom: "16px", // Space between cards
          width: "240px", // Limit card width
          height: "200px", // Limit card height
          borderTop: "2px solid blue", // Blue top border
          borderLeft: "2px solid green", // Green left border
          borderRight: "2px solid green", // Green right border
          borderBottom: "2px solid green", // Green bottom border
          backdropFilter: "blur(10px)", // Blur effect around the card
          cursor: "pointer", // Show pointer on hover
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Slightly more opaque on hover
          },
        }}
        onClick={handleCardClick}
      >
        <CardContent
          sx={{
            width: "100%", // Ensure CardContent takes full width
            padding: "16px", // Adjust padding if needed
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            {title}
          </Typography>
          <div
            className="forecastContainer"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              className="forecastContainerR1"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div>
                <Typography
                  variant="body2"
                  sx={{ color: "white" }}
                  gutterBottom
                >
                  Forecast
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {forecastValue}
                </Typography>
              </div>
              <div className="miniatureChartContainer">
                <MiniatureChart data={forecastState} data1Key={'actualConsumptionValue'} data2Key={'forecastValue'}/>
              </div>
            </div>
            <div
              className="forecastContainerR2"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div>
                <Typography
                  variant="body2"
                  sx={{ color: "white" }}
                  gutterBottom
                >
                  Forecast
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {forecastPercentage}
                </Typography>
              </div>
              <div className="miniatureChartContainer">
                <MiniatureChart data={forecastPercentageState} data1Key={'actualConsumptionPercentage'} data2Key={'forecastPercentage'}/>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TransparentCard;
