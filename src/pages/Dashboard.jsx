import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import WorldMap from "../components/WorldMap";

const Dashboard = () => {
  return (
    <section className="DashboardContainer">
      <DashboardHeader />
      <div style={{ flex: 1, overflow: 'auto' }}> {/* Allow scrolling */}
        <WorldMap />
      </div>
    </section>
  );
};

export default Dashboard;
