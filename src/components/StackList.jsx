import React from "react";
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
const tileData = [
  {
    id: 1,
    stackName: "Sample Stack 1",
    description: "This is the first card.",
  },
  {
    id: 2,
    stackName: "Sample Stack 2",
    description: "This is the second card.",
  },
  {
    id: 3,
    stackName: "Sample Stack 3",
    description: "This is the third card.",
  },
  {
    id: 4,
    stackName: "Sample Stack 4",
    description: "This is the fourth card.",
  },
  {
    id: 5,
    stackName: "Sample Stack 5",
    description: "This is the fifth card.",
  },
  {
    id: 6,
    stackName: "Sample Stack 6",
    description: "This is the sixth card.",
  },
  {
    id: 7,
    stackName: "Sample Stack 7",
    description: "This is the seventh card.",
  },
  {
    id: 8,
    stackName: "Sample Stack 8",
    description: "This is the eighth card.",
  },
];

const handleCardClick = (id) => {
  console.log(`Card ${id} clicked`);
};

const handleButtonClick = (id) => {
  console.log(`Button on Card ${id} clicked`);
};

// Click handler for the tiles
const handleTileClick = (id) => {
  console.log(`Tile ${id} clicked`);
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const StackList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      {tileData.map((tile) => (
        <Box
          key={tile.id}
          onClick={() => handleTileClick(tile.id)}
          sx={{
            padding: 2,
            cursor: "pointer",
            transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
            "&:hover": {
              border: "1px solid blue",
              backgroundColor: "rgba(211, 211, 211, 0.5)", // Light gray with opacity
              transform: "scale(1.02)",
              borderColor: "#2196f3", // Blue border on hover
              // Optional shadow
              opacity: 0.9, // Apply opacity on hover
            },
          }}
        >
          <section className="tileDataContainer">
            <div>
              <Checkbox {...label} />
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
