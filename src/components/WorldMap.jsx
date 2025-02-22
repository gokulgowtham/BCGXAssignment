import React, { useEffect, useRef } from "react";
import "./WorldMap.scss";
import { Map } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css"; // MapTiler CSS

const WorldMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/4e843e4a-7638-4d1e-9613-3050e06fb6c9/style.json?key=dDyD8fg0ysJ2I6rb0wSF",
      center: [0, 0], // Initial map center
      zoom: 2, // Initial zoom level
    });

    // Remove zoom controls
    map.removeControl("zoom");

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return (
    <section className="mapContainer">
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />
    </section>
  );
};

export default WorldMap;
