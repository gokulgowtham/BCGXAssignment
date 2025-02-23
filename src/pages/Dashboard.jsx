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

  useEffect(() => {
    const citiesData = getCities();
    setCities(citiesData);
  }, []);

  useEffect(()=>{
    if(location.pathname !== "/"){
      setIsDetailsRoute(true);
    }else{
      setIsDetailsRoute(false);
    }

  }, [location.pathname]);

  return (
    <section className="DashboardContainer">
      <div className="DashboardHeader">
        <DashboardHeader setPosition={setPosition} isDetailsRoute={isDetailsRoute}/>
      </div>
      <div className="DashboardContentContainer">
        {location.pathname === "/" && (
          <div className="worldMapContainer">
            <WorldMap cities={cities} />
          </div>
        )}
        <div className="DashboardContent">
          {/* <DashboardContent cardData={cities} position={position}/> */}
          <Routes>
            <Route
              path="/"
              element={
                <DashboardContent cardData={cities} position={position} />
              }
            />
            <Route path="/details/:cityId" element={<Details />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
