import { Typography } from "@mui/material";
import React from "react";
import TransparentCard from "./TransparentCard";
import Alert from "@mui/material/Alert";
import "./CardWidget.scss";

const DashboardContent = ({ cardData, position }) => {
  return (
    <section>
      <div style={{ display: "flex", columnGap: "20px", alignItems: "flex-start"}}>
        <Typography
          variant="h2"
          component="div"
          sx={{
            flexGrow: 1,
            color: "white",
            fontWeight: "500",
            marginBottom: "30px",
            maxWidth: "fit-content",
          }}
        >
          Hello User,
        </Typography>
        <Alert variant="filled" severity="info">
          There are 2 action items.
        </Alert>
      </div>

      <div
        className={`widgetDataWrapper ${position}`}
        style={{ height: "100%" }}
      >
        <section className={`WidgetDataContainer ${position}`}>
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
