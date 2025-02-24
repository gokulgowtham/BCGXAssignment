import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import "./TabularContainer.scss";

const TabularDataContainer = ({ forecastData }) => {
  //   useEffect(() => {
  //     if (forecastData) {
  //         const
  //     }
  //   }, [forecastData]);
  return (
    <section className="TableContainer">
      <Paper
        sx={{
          backgroundColor: "#16404D", // Background color
          minHeight: "120px", // Minimum height
          color: "white", // Text color
        }}
      >
        <Table>
          <TableBody>
            {/* Row 1 */}
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold", // Bold text for headers
                  borderBottom: "1px solid white", // Divider line
                  color: "white", // Text color
                }}
              >
                AI Forecast
              </TableCell>
              {/* Empty cells for the first 6 columns (Q1 to Q6) */}
              {(forecastData?.aiForecastData ?? []).map((value, index) => (
                <TableCell
                  key={index + 6}
                  sx={{ borderBottom: "1px solid white", color: "white" }}
                >
                  {value || '-'}
                </TableCell>
              ))}
            </TableRow>

            {/* Row 2 */}
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "1px solid white", // Divider line
                  color: "white",
                }}
              >
                Previous qt. final forecast
              </TableCell>
              
              {/* Cells with values for the remaining 6 columns (Q7 to Q12) */}
              {(forecastData?.previousQtrFinalForecast ?? []).map((value, index) => (
                <TableCell
                  key={index + 6}
                  sx={{ borderBottom: "1px solid white", color: "white" }}
                >
                  {value || '-'}
                </TableCell>
              ))}
            </TableRow>

            {/* Row 3 */}
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "none", // No divider for the last row
                  color: "white",
                }}
              >
                Final forecast
              </TableCell>
              {/* Empty cells for the first 6 columns (Q1 to Q6) */}
              {/* Cells with values for the remaining 6 columns (Q7 to Q12) */}
              {(forecastData?.finalForecastData ?? []).map((value, index) => (
                <TableCell
                  key={index + 6}
                  sx={{ borderBottom: "none", color: "white" }}
                >
                  {value || '-'}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </section>
  );
};

export default TabularDataContainer;
