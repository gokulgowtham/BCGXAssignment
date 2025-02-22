import { Typography } from "@mui/material";
import React from "react";
import CardWidget from "./TransparentCard";
import TransparentCard from "./TransparentCard";
import './CardWidget.scss';

const DashboardContent = ({cardData}) => {
  return (
    <section style={{height: '100%'}}>
      <Typography
        variant="h2"
        component="div"
        sx={{ flexGrow: 1, color: "white", fontWeight: "500" }}
      >
        Hello User,
      </Typography>

      <div style={{ height: '100%'}}>
        <section className="WidgetDataContainer">
          {cardData.map(
            ({ title, forecastValue, forecastPercentage }, index) => (
              <TransparentCard
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
