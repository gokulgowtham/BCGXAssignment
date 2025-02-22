import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import WorldMap from "../components/WorldMap";
import "./Dashboard.scss";
import { Typography } from "@mui/material";
import DashboardContent from "../components/DashboardContent";
const Dashboard = () => {
  return (
    <section className="DashboardContainer">
      <div className="DashboardHeader">
        <DashboardHeader />
      </div>
      <div className="DashboardContentContainer">
        <div className="worldMapContainer">
          <WorldMap />
        </div>
        <div className="DashboardContent">
          <DashboardContent />
          {/* <p>Coming soon...</p> */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
