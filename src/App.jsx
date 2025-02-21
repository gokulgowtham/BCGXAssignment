import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import Details from './pages/Details';
import './App.scss';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/details/:widgetId" element={<Details />} /> */}
    </Routes>
  );
}

export default App;