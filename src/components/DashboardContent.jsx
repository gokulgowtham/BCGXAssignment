import { Typography } from "@mui/material";
import React from "react";
import CardWidget from "./TransparentCard";
import TransparentCard from "./TransparentCard";
import "./CardWidget.scss";

const DashboardContent = ({ cardData, position }) => {
  return (
    <section style={{ height: "80vh", width: '90vw' }}>
      <Typography
        variant="h2"
        component="div"
        sx={{ flexGrow: 1, color: "white", fontWeight: "500" }}
      >
        Hello User, 
      </Typography>

      <div className={`widgetDataWrapper ${position}`} style={{ height: "100%" }}>
        <section
          className={`WidgetDataContainer ${position}`}
        >
          {cardData.map(
            ({ title, forecastValue, forecastPercentage, id }, index) => (
              <TransparentCard
                cityId={id}
                key={index}
                title={title}
                forecastValue={forecastValue}
                forecastPercentage={forecastPercentage}
              />
            )
          )}
     </section>
     </div>
    </section>
  );
};

export default DashboardContent;
