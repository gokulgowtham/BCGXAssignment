import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Box,
  Checkbox,
  Chip,
} from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import "./StackList.scss";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const StackList = ({ stackData, stackIdState }) => {
  // const [selectedTileId, setSelectedTileId] = stackIdState;

  const [selectedStackId, setSelectedStackId] = stackIdState;
  // Click handler for the tiles
  const handleTileClick = (id) => {
    console.log(`Tile ${id} clicked`);
    setSelectedStackId(id === selectedStackId ? null : id);
  };

  useEffect(() => {
    if (stackData.length > 0) {
      setSelectedStackId(stackData[0].stackId);
    }
  }, [stackData]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      {stackData?.map((tile) => (
        <Box
          key={tile?.stackId}
          onClick={() => handleTileClick(tile?.stackId)}
          sx={{
            padding: 2,
            cursor: "pointer",
            transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
            backgroundColor:
              selectedStackId === tile.stackId
                ? "rgba(211, 211, 211, 0.5)" // Light gray with opacity when selected
                : "transparent",
            transform:
              selectedStackId === tile.stackId ? "scale(1.02)" : "none", // Scale when selected
            borderColor:
              selectedStackId === tile.stackId ? "#2196f3" : "transparent", // Blue border when selected
            "&:hover": {
              border: "1px solid blue",
              backgroundColor: "rgba(211, 211, 211, 0.5)", // Light gray with opacity
              transform: "scale(1.02)",
            },
          }}
        >
          <section className="tileDataContainer">
            <div>
              <Checkbox
                checked={selectedStackId === tile.stackId} // Checkbox is checked if tile is selected
                onChange={() => handleTileClick(tile.stackId)} // Toggle selection on checkbox click
                sx={{
                  "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                    color: "lavenderblush",
                  },
                }}
              />
            </div>
            <div className="tileDataR1">
              <Chip
                label={`F'CAST STAB.`}
                sx={{
                  borderRadius: "4px", // Rectangular with rounded corners
                  padding: "6px 4px", // Adjust padding for a smaller size
                  fontSize: "0.8rem", // Smaller font size
                  backgroundColor: "#e0e0e0", // Background color
                  color: "#000", // Text color,
                  height: "20px",
                  fontWeight: "600",
                }}
              />
              <Chip
                label={`F'CAST ACC.`}
                sx={{
                  borderRadius: "4px", // Rectangular with rounded corners
                  padding: "6px 4px", // Adjust padding for a smaller size
                  fontSize: "0.8rem", // Smaller font size
                  backgroundColor: "#e0e0e0", // Background color
                  color: "#000", // Text color,
                  height: "20px",
                  fontWeight: "600",
                }}
              />
            </div>
            <div>
              <MarkEmailUnreadIcon sx={{ color: "#42f5b3" }} />
            </div>
          </section>
          <div>
            <Typography
              variant="body1"
              sx={{ color: "white", marginLeft: "40px" }}
              gutterBottom
            >
              {tile.stackName}
            </Typography>
          </div>
        </Box>
      ))}
    </Box>
  );
};

export default StackList;
