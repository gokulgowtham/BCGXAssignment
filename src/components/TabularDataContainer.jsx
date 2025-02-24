import React from "react";
import { Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import "./TabularContainer.scss";

const TabularDataContainer = () => {
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
                Data1
              </TableCell>
              {/* Empty cells for the first 6 columns (Q1 to Q6) */}
              {[...Array(6)].map((_, index) => (
                <TableCell
                  key={index}
                  sx={{ borderBottom: "1px solid white", color: "white" }}
                >
                  {/* Empty cell */}
                  -
                </TableCell>
              ))}
              {/* Cells with values for the remaining 6 columns (Q7 to Q12) */}
              {[...Array(6)].map((_, index) => (
                <TableCell
                  key={index + 6}
                  sx={{ borderBottom: "1px solid white", color: "white" }}
                >
                  Q{index + 7} Value
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
                Data2
              </TableCell>
              {/* Empty cells for the first 6 columns (Q1 to Q6) */}
              {[...Array(6)].map((_, index) => (
                <TableCell
                  key={index}
                  sx={{ borderBottom: "1px solid white", color: "white" }}
                >
                  {/* Empty cell */}
                  -
                </TableCell>
              ))}
              {/* Cells with values for the remaining 6 columns (Q7 to Q12) */}
              {[...Array(6)].map((_, index) => (
                <TableCell
                  key={index + 6}
                  sx={{ borderBottom: "1px solid white", color: "white" }}
                >
                  Q{index + 7} Value
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
                Data3
              </TableCell>
              {/* Empty cells for the first 6 columns (Q1 to Q6) */}
              {[...Array(6)].map((_, index) => (
                <TableCell
                  key={index}
                  sx={{ borderBottom: "none", color: "white" }}
                >
                  {/* Empty cell */}
                  -
                </TableCell>
              ))}
              {/* Cells with values for the remaining 6 columns (Q7 to Q12) */}
              {[...Array(6)].map((_, index) => (
                <TableCell
                  key={index + 6}
                  sx={{ borderBottom: "none", color: "white" }}
                >
                  Q{index + 7} Value
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