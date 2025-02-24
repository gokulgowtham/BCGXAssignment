import React, { useEffect, useRef } from "react";
import "./WorldMap.scss";
import { Map, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css"; // MapTiler CSS
import { LocationOn, Place } from "@mui/icons-material";
import { createRoot } from "react-dom/client";
import CustomMapPopup from "./CustomMapPopup";

const WorldMap = ({ cities }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Log coordinates for debugging
    console.log("Cities:", cities);

    // Initialize the map
    try {
      map.current = new Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/4e843e4a-7638-4d1e-9613-3050e06fb6c9/style.json?key=dDyD8fg0ysJ2I6rb0wSF`, // Replace with your style URL
        center: [77.1025, 50.0], // Initial map center (longitude, latitude)
        zoom: 2, // Initial zoom level
        interactive: true, // Ensure the map is still interactive
      });

      // Add markers for each city
      cities.forEach((city) => {
        const {
          title,
          coordinates,
          iconSetUrl,
          forecastValue,
          forecastPercentage,
        } = city;

        // Create a container for the custom icon
        const iconContainer = document.createElement("div");

        // Create an image element for the custom icon
        const iconImage = document.createElement("img");
        iconImage.src = iconSetUrl; // URL of the custom icon
        iconImage.style.width = "30px"; // Set icon size
        iconImage.style.height = "30px"; // Set icon size
        iconImage.style.cursor = "pointer"; // Show pointer cursor on hover

        // Append the image to the container
        iconContainer.appendChild(iconImage);

        // Create a marker with the custom icon
        const marker = new Marker({ element: iconContainer })
          .setLngLat(coordinates)
          .addTo(map.current);

        // Create a container for the custom popup
        const popupContainer = document.createElement("div");
        const popupRoot = createRoot(popupContainer);

        // Render the custom popup component
        popupRoot.render(
          <CustomMapPopup
            title={title}
            forecastValue={forecastValue}
            forecastPercentage={forecastPercentage}
          />
        );

        // Create a MapTiler Popup and attach it to the marker
        const popup = new Popup({ offset: 5 })
          .setDOMContent(popupContainer)
          .addTo(map.current);

        // Attach the popup to the marker
        marker.setPopup(popup);

        marker.getElement().addEventListener("mouseenter", () => {
          console.log("Mouse entered marker"); // Debugging
          marker.togglePopup(); // Open popup
        });
        
        marker.getElement().addEventListener("mouseleave", () => {
          console.log("Mouse left marker"); // Debugging
          marker.togglePopup(); // Close popup
        });
      });

      // Add resize event listener to make the map responsive
      const handleResize = () => {
        if (map.current) {
          map.current.resize(); // Resize the map to fit its container
        }
      };

      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => {
        window.removeEventListener("resize", handleResize); // Remove resize listener
        map.current?.remove(); // Remove the map
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [cities]);

  return (
    <section className="mapContainer">
      <div
        ref={mapContainer}
        style={{ height: "100%", width: "100%", position: "relative" }}
      />
    </section>
  );
};

export default WorldMap;
