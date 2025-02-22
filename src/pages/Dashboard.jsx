import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import WorldMap from "../components/WorldMap";
import "./Dashboard.scss";
import { Typography } from "@mui/material";
import DashboardContent from "../components/DashboardContent";
import { getCities } from "../mockApi";

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

const Dashboard = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const citiesData = getCities();
    setCities(citiesData);
  }, []);

  return (
    <section className="DashboardContainer">
      <div className="DashboardHeader">
        <DashboardHeader />
      </div>
      <div className="DashboardContentContainer">
        <div className="worldMapContainer">
          <WorldMap cities={cities}/>
        </div>
        <div className="DashboardContent">
          <DashboardContent cardData={cities}/>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
