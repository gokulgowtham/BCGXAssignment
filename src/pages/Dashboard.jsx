import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import WorldMap from "../components/WorldMap";
import "./Dashboard.scss";
import { Typography } from "@mui/material";
import DashboardContent from "../components/DashboardContent";
import { getCities } from "../mockApi";

const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [position, setPosition] = useState('top');
  useEffect(() => {
    const citiesData = getCities();
    setCities(citiesData);
  }, []);

  return (
    <section className="DashboardContainer">
      <div className="DashboardHeader">
        <DashboardHeader setPosition={setPosition} />
      </div>
      <div className="DashboardContentContainer">
        <div className="worldMapContainer">
          <WorldMap cities={cities}/>
        </div>
        <div className="DashboardContent">
          <DashboardContent cardData={cities} position={position}/>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
