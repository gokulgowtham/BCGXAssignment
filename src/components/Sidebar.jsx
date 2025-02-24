import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getValuesForStack } from "../mockApi";
import Backlog from "./Backlog";

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
const Sidebar = ({ sideBarState, stackData, stackIdState, stackIdData }) => {
  const [selectedStackId, setSelectedStackId] = stackIdState;
  const { cityId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = sideBarState;
  const [tabValue, setTabValue] = useState("backlog");
  const navigate = useNavigate();
  const handleBackClick = () => navigate("/");
  const { backlog, pending, finalSignOff } = getValuesForStack(cityId || "1");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
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
          <IconButton onClick={handleBackClick}>
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
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  marginLeft: "10px",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Will be implemented in next iteration
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={"finalSignOff"}>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  marginLeft: "10px",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Will be implemented in next iteration
              </Typography>
            </TabPanel>
          </section>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
