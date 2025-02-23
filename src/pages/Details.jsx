import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Drawer,
  Box,
  Button,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import TabPanel from '@mui/lab/TabPanel';
import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BorderLeft } from "@mui/icons-material";
import { getValuesForStack } from "../mockApi";
import Backlog from "../components/Backlog";

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [isSidebarOpen, setIsSidebarOpen] = sideBarState;
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { backlog, pending, finalSignOff } = getValuesForStack(cityId || "1");
  return (
    <div className="DetailsContainer">
      <Box sx={{ display: "flex", height: "calc(100vh)", overflow: "hidden" }}>
        <Drawer
          variant="persistent" // Keeps the drawer in the DOM when closed
          open={isSidebarOpen}
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
          {/* Wrap the content in a Box to isolate styles */}
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
                Sample Stack
              </Typography>
              <section className="TabContainer">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  // variant="scrollable"
                  // scrollButtons="auto"
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
                  <Backlog backlogValue={backlog} />
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
      </Box>
    </div>
  );
};

export default Details;
