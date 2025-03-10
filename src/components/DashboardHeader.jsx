import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuOutlined, SettingsOutlined } from "@mui/icons-material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import "./DashboardHeader.scss";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ButtonAppBar({
  setPosition,
  isDetailsRoute,
  sideBarState,
}) {
  const { cityId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = sideBarState;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = () => {
    if (!isDetailsRoute) {
      return;
    }
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <section>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            height: "40px",
          }}
        >
          <section className="headerContentContainer">
            <div className="menuWithTitle">
              <Tooltip title="menu" arrow>
                <IconButton
                  aria-controls={open ? "settings-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleMenuClick}
                >
                  <MenuOutlined sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              {!isDetailsRoute && (
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, fontSize: "1rem", marginTop: "8px" }}
                >
                  Webapp
                </Typography>
              )}
            </div>
            <div className="rightHeaderDetails">
              {!isDetailsRoute && (
                <>
                  <div className="positionContainer">
                    <Tooltip title="position settings">
                      <IconButton
                        onClick={handleClick}
                        aria-controls={open ? "settings-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <SettingsOutlined sx={{ color: "white" }} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      {" "}
                      <MenuItem onClick={() => setPosition("top")}>
                        Top
                      </MenuItem>
                      <MenuItem onClick={() => setPosition("right")}>
                        Right
                      </MenuItem>
                      <MenuItem onClick={() => setPosition("bottom")}>
                        Bottom
                      </MenuItem>
                      <MenuItem onClick={() => setPosition("left")}>
                        Left
                      </MenuItem>
                    </Menu>
                  </div>
                  <div>
                  <Tooltip title="Coming soon..." arrow>
                    <IconButton
                      aria-controls={open ? "settings-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <LanguageOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>
                    </Tooltip>
                  </div>{" "}
                </>
              )}
              <div className="userIcon">
              <Tooltip title="Gowtham V" arrow>
                <IconButton
                  onClick={handleClick}
                  aria-controls={open ? "settings-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <PersonOutlineOutlinedIcon sx={{ color: "white" }} />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontSize: "1rem" }}
                  >
                    User
                  </Typography>
                </IconButton>
                </Tooltip>
              </div>
            </div>
          </section>
        </AppBar>
      </Box>
    </section>
  );
}
