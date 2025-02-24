import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import "./App.scss";
function App() {
  
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true); //rempve this post dev 

  return <Dashboard />;
  // return <Details  sideBarState={[isSidebarOpen, setIsSidebarOpen]}/>;
}

export default App;
