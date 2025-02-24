import React, { useEffect, useRef, useState } from "react";
import "./WorldMap.scss";
import { Map, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css"; // MapTiler CSS
import { LocationOn, Place } from "@mui/icons-material";
import { createRoot } from "react-dom/client";
import CustomMapPopup from "./CustomMapPopup";
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Typography,
} from "@mui/material";

const WorldMap = ({ cities }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef([]);
  const initialZoom = 1;
  const targetZoom = 2;
  const animationDuration = 2000;

  const animateZoom = (startZoom, endZoom, duration) => {
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic easing
        const currentZoom = startZoom + (endZoom - startZoom) * easeProgress;

        map.current.setZoom(currentZoom);
        requestAnimationFrame(animate);
      } else {
        map.current.setZoom(endZoom);
      }
    };

    animate();
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      map.current = new Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/4e843e4a-7638-4d1e-9613-3050e06fb6c9/style.json?key=dDyD8fg0ysJ2I6rb0wSF`,
        center: [77.1025, 50.0],
        zoom: initialZoom,
        interactive: true,
      });

      map.current.on("load", () => {
        // Start zoom animation after map loads
        setTimeout(() => {
          setIsLoading(false);
          animateZoom(initialZoom, targetZoom, animationDuration);
        }, 500);

        cities.forEach((city) => {
          const {
            title,
            coordinates,
            iconSetUrl,
            forecastValue,
            forecastPercentage,
          } = city;

          const iconContainer = document.createElement("div");
          iconContainer.className = "marker-container";

          const iconImage = document.createElement("img");
          iconImage.src = iconSetUrl;
          iconImage.className = "marker-icon";
          iconContainer.appendChild(iconImage);

          const marker = new Marker({ element: iconContainer })
            .setLngLat(coordinates)
            .addTo(map.current);

          const popupContainer = document.createElement("div");
          const popupRoot = createRoot(popupContainer);

          popupRoot.render(
            <CustomMapPopup
              title={title}
              forecastValue={forecastValue}
              forecastPercentage={forecastPercentage}
            />
          );

          const popup = new Popup({
            offset: 5,
            closeButton: false,
            closeOnClick: false,
          }).setDOMContent(popupContainer);

          marker.setPopup(popup);

          marker.getElement().addEventListener("mouseenter", () => {
            marker.togglePopup();
          });

          marker.getElement().addEventListener("mouseleave", () => {
            marker.togglePopup();
          });

          markersRef.current.push(marker);
        });
      });

      const handleResize = () => {
        if (map.current) {
          map.current.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        markersRef.current.forEach((marker) => marker.remove());
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setIsLoading(false);
    }
  }, [cities]);

  return (
    <section className="mapContainer">
      <Fade in={isLoading}>
        <Backdrop
          open={isLoading}
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            marginTop={"100px"}
          >
            <CircularProgress color="primary" size={60} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "white",
                fontWeight: 500,
                textAlign: "center",
                
              }}
            >
              Preparing your world view...
            </Typography>
          </Box>
        </Backdrop>
      </Fade>
      <div
        ref={mapContainer}
        className={`map-element ${isLoading ? "loading" : "loaded"}`}
        style={{ height: "100%", width: "100%", position: "relative" }}
      />
    </section>
  );
};

export default WorldMap;
