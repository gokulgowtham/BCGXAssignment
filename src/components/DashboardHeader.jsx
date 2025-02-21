import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuOutlined } from "@mui/icons-material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./DashboardHeader.scss";

export default function ButtonAppBar() {
  return (
    <section>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky" // Makes the AppBar sticky
          sx={{
            backgroundColor: "#000", // Black background
            color: "#fff", // White text color
            height: "40px", // Adjust height as needed
          }}
        >
          <section className="headerContentContainer">
            <div className="menuWithTitle">
              <MenuOutlined />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontSize: "1rem" }}
              >
                Webapp
              </Typography>
            </div>
            <div className="rightHeaderDetails">
              <div>
                <LanguageOutlinedIcon />
              </div>
              <div className="userIcon">
                <PersonOutlineOutlinedIcon />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, fontSize: "1rem" }}
                >
                  User
                </Typography>
              </div>
            </div>
          </section>

          {/* <Button color="inherit">Login</Button> */}
        </AppBar>
      </Box>
    </section>
  );
}
