import React, { useEffect, useState, Suspense, lazy } from "react";
import DashboardHeader from "../components/DashboardHeader";
import "./Dashboard.scss";
import { Typography } from "@mui/material";
import DashboardContent from "../components/DashboardContent";
import { getCities } from "../mockApi";
import { Routes, Route, useLocation } from "react-router-dom";
// Lazy load the WorldMap component
const WorldMap = React.lazy(() => import("../components/WorldMap"));
const Details = lazy(()=>import("./Details"));

const LoadingFallback = () => (
  <div className="loading-container">
    <Typography variant="h6">Loading...</Typography>
  </div>
);

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
            <Suspense fallback={<LoadingFallback/>}>
              <WorldMap cities={cities} />
            </Suspense>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <div className="DashboardContent">
                <DashboardContent cardData={cities} position={position} />
              </div>
            }
          />
          <Route
            path="/details/:cityId"
            element={
              <Details sideBarState={[isSidebarOpen, setIsSidebarOpen]} />
            }
          />
        </Routes>
      </div>
    </section>
  );
};

export default Dashboard;
