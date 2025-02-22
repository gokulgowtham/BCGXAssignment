import { Typography } from "@mui/material";
import React from "react";
import CardWidget from "./CardWidget";

const DashboardContent = () => {
  return (
    <section>
      <Typography
        variant="h2"
        component="div"
        sx={{ flexGrow: 1, color: "white", fontWeight: "500" }}
      >
        Hello User,
      </Typography>

      <div>
        <CardWidget/>
      </div>
    </section>
  );
};

export default DashboardContent;
