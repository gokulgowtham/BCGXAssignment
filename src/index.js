import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
// Get the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render the App component into the root
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
