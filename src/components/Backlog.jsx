import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, IconButton, Stack } from "@mui/material";
import StackList from "./StackList";
const Backlog = ({stackData, stackIdState}) => {
  return (
    <section className="backlogContainer">
      <Button variant="text" sx={{color: "#42f5b3"}} endIcon={<FilterListIcon onClick={()=>console.log('filter clicked!')}/>}>
        Filter
      </Button>
      <StackList stackData={stackData} stackIdState={stackIdState}/>
    </section>
  );
};

export default Backlog;
