import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Drawer,
  Box,
  Button,
  IconButton,
  styled,
  Typography,
  Divider,
  Switch,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import TabPanel from '@mui/lab/TabPanel';
import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BorderLeft, OutlinedFlag } from "@mui/icons-material";
import { getStackDetails, getValuesForStack } from "../mockApi";
import Backlog from "../components/Backlog";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import "./Details.scss";
import ChartContainer from "../components/ChartContainer";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";
import TabularDataContainer from "../components/TabularDataContainer";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Details = ({ sideBarState }) => {
  const { cityId } = useParams();
  const [tabValue, setTabValue] = useState("backlog");
  const [stackData, setStackData] = useState([]);
  const [selectedStackId, setSelectedStackId] = useState(null);
  const [stackIdData, setStackIdData] = useState(null);
  const [aiForecastToggle, setAiForecastToggle] = useState(true);
  const [finalForecastToggle, setFinalForecastToggle] = useState(true);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [isSidebarOpen, setIsSidebarOpen] = sideBarState;
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { backlog, pending, finalSignOff } = getValuesForStack(cityId || "1");
  // const stackDataResp = getStackDetails(tabValue);

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
        {/* Sidebar Drawer */}
        <Drawer
          variant="persistent" // Keeps the drawer in the DOM when closed
          open={isSidebarOpen}
          anchor="left"
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: "300px", md: "25vw" }, // Responsive width
              minWidth: "250px", // Minimum width for the sidebar
              maxWidth: "400px", // Maximum width for the sidebar
              boxSizing: "border-box",
              borderRight: "1px solid #ccc",
              transition: "width 0.3s ease", // Smooth transition for opening/closing
              height: "calc(100vh - 40px)", // Adjust height to account for header
              marginTop: "40px", // Push sidebar down by header height
              backgroundColor: "#16404D", // Background color for the Drawer
              overflow: "auto", // Allow content to be scrollable
            },
          }}
        >
          {/* Sidebar Content */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <IconButton onClick={() => console.log("back")}>
                <ArrowBackIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={toggleSidebar}>
                <KeyboardDoubleArrowLeftIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>

            <Box sx={{ p: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: "white", paddingLeft: "10px" }}
                gutterBottom
              >
                {stackIdData?.stackName || "Sample Stack"}
              </Typography>
              <section className="TabContainer">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#42f5b3", // Custom indicator color
                    },
                    "& .MuiTab-root": {
                      color: "white", // Custom text color
                      fontSize: "0.75rem", // Reduced font size
                      fontWeight: "600", // Bold font weight
                      minWidth: "auto", // Reduce minimum width
                      padding: "6px 12px", // Reduce padding
                      "&.Mui-selected": {
                        color: "#42f5b3", // Custom text color for selected tab
                      },
                    },
                  }}
                  aria-label="secondary tabs example"
                >
                  <Tab value="backlog" label={`BACKLOG (${backlog})`} />
                  <Tab value="pending" label={`PENDING (${pending})`} />
                  <Tab
                    value="finalSignOff"
                    label={`FINAL SIGN-OFF (${finalSignOff})`}
                  />
                </Tabs>
                <TabPanel value={tabValue} index={"backlog"}>
                  <Backlog
                    backlogValue={backlog}
                    stackData={stackData}
                    stackIdState={[selectedStackId, setSelectedStackId]}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={"pending"}>
                  Item Two
                </TabPanel>
                <TabPanel value={tabValue} index={"finalSignOff"}>
                  Item Three
                </TabPanel>
              </section>
            </Box>
          </Box>
        </Drawer>

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
                <CircularProgressWithLabel value={Number(stackIdData?.forecastData2.replace("%", "")) || ""} />
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
                <CircularProgressWithLabel value={Number(stackIdData?.forecastData2.replace("%", "")) || ""} />
              </div>
            </div>
            <ChartContainer
              selectedStackId={selectedStackId}
              mapToggleState={[aiForecastToggle, finalForecastToggle]}
              // stackIdData={stackIdData}
            />
          </section>
        </Box>
      </Box>
    </div>
  );
};

export default Details;
