import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import WorldMap from "../components/WorldMap";
import "./Dashboard.scss";
import { Typography } from "@mui/material";
import DashboardContent from "../components/DashboardContent";
import { getCities } from "../mockApi";
import { Routes, Route, useLocation } from "react-router-dom";
import Details from "./Details";

const Dashboard = () => {
  const location = useLocation();
  const [cities, setCities] = useState([]);
  const [position, setPosition] = useState("top");
  const [isDetailsRoute, setIsDetailsRoute] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    const citiesData = getCities();
    setCities(citiesData);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsDetailsRoute(true);
    } else {
      setIsDetailsRoute(false);
    }
  }, [location.pathname]);

  return (
    <section className="DashboardContainer">
      <div className="DashboardHeader">
        <DashboardHeader
          setPosition={setPosition}
          isDetailsRoute={isDetailsRoute}
          sideBarState={[isSidebarOpen, setIsSidebarOpen]}
        />
      </div>
      <div className="DashboardContentContainer">
        {location.pathname === "/" && (
          <div className="worldMapContainer">
            <WorldMap cities={cities} />
          </div>
        )}
        {/* <DashboardContent cardData={cities} position={position}/> */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="DashboardContent">
                <DashboardContent cardData={cities} position={position} />
              </div>
            }
          />
          <Route path="/details/:cityId" element={<Details sideBarState={[isSidebarOpen, setIsSidebarOpen]}/>} />
        </Routes>
      </div>
    </section>
  );
};

export default Dashboard;
