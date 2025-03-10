import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, Divider, Switch } from "@mui/material";
import { OutlinedFlag } from "@mui/icons-material";
import { getStackDetails, getValuesForStack } from "../mockApi";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import "./Details.scss";
import ChartContainer from "../components/ChartContainer";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";
import Sidebar from "../components/Sidebar";

const Details = ({ sideBarState }) => {
  const [tabValue, setTabValue] = useState("backlog");
  const [stackData, setStackData] = useState([]);
  const [selectedStackId, setSelectedStackId] = useState(null);
  const [stackIdData, setStackIdData] = useState(null);
  const [aiForecastToggle, setAiForecastToggle] = useState(true);
  const [finalForecastToggle, setFinalForecastToggle] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = sideBarState;

  useEffect(() => {
    const callGetStackDetails = async () => {
      const stackDataResp = getStackDetails(tabValue);
      setStackData(stackDataResp);
    };

    if (tabValue !== "") {
      callGetStackDetails();
    }
  }, [tabValue]);

  useEffect(() => {
    if (selectedStackId && stackData) {
      setStackIdData(
        stackData.find((stack) => stack?.stackId === selectedStackId)
      );
    }
  }, [selectedStackId, stackData]);

  const handleMapToggle = (event) => {
    const { name, checked } = event.target;
    if (name === "aiForecastToggle") {
      setAiForecastToggle(checked);
    } else if (name === "finalForecastToggle") {
      setFinalForecastToggle(checked);
    }
  };
  return (
    <div className="DetailsContainer">
      <Box sx={{ display: "flex", height: "calc(100vh)", overflow: "hidden" }}>
        <Sidebar
          sideBarState={sideBarState}
          stackData={stackData}
          stackIdState={[selectedStackId, setSelectedStackId]}
          stackIdData={stackIdData}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1, // Takes up remaining space
            maxWidth: `calc(100vw - ${isSidebarOpen ? "380px" : "0px"})`, // Adjust width based on drawer state
            position: "relative",
            left: isSidebarOpen ? "380px" : "0px", // Adjust left position based on drawer state
            height: "calc(100vh - 40px)", // Adjust height to account for header
            overflow: "auto", // Allow content to be scrollable
            transition: "width 0.3s ease", // Smooth transition for opening/closing
            // Add some padding
          }}
        >
          <section className="mainContainer">
            <div className="header1">
              <div className="header1--unit1">
                <WarningAmberIcon sx={{ color: "orange" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {stackIdData?.stackName || "Sample Stack"}
                </Typography>
              </div>
              <div className="header1--unit2">
                <Divider
                  sx={{ backgroundColor: "white" }}
                  // variant="middle"
                  orientation="vertical"
                  flexItem
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  Stack Id: {stackIdData?.stackId || "099837465721XX"}
                </Typography>
              </div>
              <div className="header1--unit3">
                <Box
                  sx={{
                    display: "flex",
                    border: "2px solid #000",
                    borderRadius: "8px", // Border radius for the tile
                    minWidth: "280px",
                    columnGap: "60px",
                    alignItems: "flex-start",
                    backgroundColor: "#98d0e1",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    opacity: "0.6",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignItems: "center",
                      margin: "0 10px", // Space between content
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="#333"
                    >
                      FORECAST
                    </Typography>
                    <Typography variant="caption" color="#666">
                      {stackIdData?.forecastData1 || "89%"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      margin: "0 10px", // Space between content
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="#333"
                    >
                      FORECAST
                    </Typography>
                    <Typography variant="caption" color="#666">
                      {stackIdData?.forecastData2 || "80%"}
                    </Typography>
                  </Box>
                </Box>
              </div>
              <div className="header1--unit4">
                <OutlinedFlag sx={{ color: "white" }} />
              </div>
            </div>
            <div className="header2">
              <div className="header2--unit1">
                <FilePresentIcon sx={{ color: "white" }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                    // fontWeight: "bold",
                  }}
                >
                  SPECIAL REQUIREMENTS
                </Typography>
              </div>
              <div className="header2--unit2">
                <Switch size="small" />
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  INCLUDE
                </Typography>
              </div>
            </div>
            <div className="mapHeader">
              <div>
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  Forecast Horizon
                </Typography>
              </div>
              <div>
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  Latest Issue
                </Typography>
                <IconButton aria-haspopup="true" onClick={() => {}}>
                  <ArrowDropDownIcon sx={{ color: "white" }} />
                </IconButton>
              </div>
              <div>
                <ErrorOutlineIcon sx={{ color: "yellow" }} />
              </div>
              <Divider
                sx={{ backgroundColor: "white", height: "16px" }}
                orientation="vertical"
              />
              <div>
                <Switch
                  size="small"
                  name=""
                  sx={{
                    // Styles for the track (background) of the Switch
                    "& .MuiSwitch-track": {
                      backgroundColor: "grey", // Grey color when off
                    },
                    // Styles for the thumb (circle) of the Switch
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "white", // White color for the thumb
                    },
                    // Styles for the Switch when it is checked (on)
                    "&.Mui-checked": {
                      "& .MuiSwitch-track": {
                        backgroundColor: "green", // Green color when on
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white", // White color for the thumb when on
                      },
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  SHOW CONFIDENCE INTERVAL
                </Typography>
              </div>
            </div>
            <div className="mapHeader2">
              <div className="mapHeader2--unit1">
                {" "}
                <Switch
                  size="small"
                  name="aiForecastToggle"
                  defaultChecked={true}
                  checked={aiForecastToggle}
                  onChange={handleMapToggle}
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: "grey",
                    },

                    "& .MuiSwitch-thumb": {
                      backgroundColor: "white",
                    },

                    "&.Mui-checked": {
                      "& .MuiSwitch-track": {
                        backgroundColor: "green",
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white",
                      },
                    },
                  }}
                />
                <Divider
                  sx={{
                    height: "14px",
                    backgroundColor: "#38b000",
                    width: "6px",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  AI FORECAST
                </Typography>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    Number(stackIdData?.forecastData2.replace("%", "")) || ""
                  }
                />
              </div>
              <div className="mapHeader2--unit1">
                {" "}
                <Switch
                  size="small"
                  name="finalForecastToggle"
                  defaultChecked={true}
                  selected={finalForecastToggle}
                  onChange={handleMapToggle}
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: "grey",
                    },

                    "& .MuiSwitch-thumb": {
                      backgroundColor: "white",
                    },

                    "&.Mui-checked": {
                      "& .MuiSwitch-track": {
                        backgroundColor: "green",
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white",
                      },
                    },
                  }}
                />
                <Divider
                  sx={{
                    height: "14px",
                    backgroundColor: "#42f5b3",
                    width: "6px",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  FINAL FORECAST
                </Typography>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    Number(stackIdData?.forecastData2.replace("%", "")) || ""
                  }
                />
              </div>
            </div>
            <ChartContainer
              selectedStackId={selectedStackId}
              mapToggleState={[aiForecastToggle, finalForecastToggle]}
            />
          </section>
        </Box>
      </Box>
    </div>
  );
};

export default Details;
