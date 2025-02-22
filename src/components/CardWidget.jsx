import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import './CardWidget.scss';
const cardData = [
  {
    title: "City 1",
    forecastValue: "45.7M",
    forecastPercentage: "65%",
  },
  {
    title: "City 2",
    forecastValue: "30.2M",
    forecastPercentage: "50%",
  },
  {
    title: "City 3",
    forecastValue: "20.1M",
    forecastPercentage: "35%",
  },
  {
    title: "City 4",
    forecastValue: "15.3M",
    forecastPercentage: "25%",
  },
  {
    title: "City 5",
    forecastValue: "10.8M",
    forecastPercentage: "15%",
  },
  {
    title: "City 6",
    forecastValue: "5.4M",
    forecastPercentage: "10%",
  },
  {
    title: "City 6",
    forecastValue: "5.4M",
    forecastPercentage: "10%",
  },
  {
    title: "City 6",
    forecastValue: "5.4M",
    forecastPercentage: "10%",
  },
];

const CardWidget = () => {
  return (
    <section className="WidgetDataContainer">
      {cardData.map(({ title, forecastValue, forecastPercentage }, index) => (
        <TransparentCard
          key={index}
          title={title}
          forecastValue={forecastValue}
          forecastPercentage={forecastPercentage}
        />
      ))}
    </section>
  );
};
const TransparentCard = ({ title, forecastValue, forecastPercentage }) => {
  return (
    <section>
      <Card
        sx={{
        display: "flex",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white background
          backdropFilter: "blur(0.5px)", // Optional: Adds a blur effect
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px", // Space between cards
          width: "100%", // Full width
          width: "240px", // Limit card width
          height: "200px", // Limit card height
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Slightly more opaque on hover
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "white" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            {forecastValue}
          </Typography>
          <Typography variant="body2" sx={{color: "white" }}>
            {forecastPercentage}
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
};

export default CardWidget;
