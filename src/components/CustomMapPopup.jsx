import React from "react";
import { Card, Typography, Box } from "@mui/material";

const CustomMapPopup = ({title, forecastValue, forecastPercentage}) => {
  return (
    <Card sx={{minWidth: 60}}>
      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
        <Typography variant="body2">
          <strong>Forecast Value:</strong> {forecastValue}
        </Typography>
        <Typography variant="body2">
          <strong>Forecast Percentage:</strong> {forecastPercentage}
        </Typography>
      </Box>
    </Card>
  )
}

export default CustomMapPopup;