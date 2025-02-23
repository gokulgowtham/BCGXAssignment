import { useParams } from 'react-router-dom';
import React from "react";
const Details = () => {
  const { cityId } = useParams();

  // Fetch city details based on cityId
  // const cityDetails = fetchCityDetails(cityId);

  return (
    <div>
      <h2>City Details</h2>
      <p>City ID: {cityId}</p>
      {/* Display other city details here */}
    </div>
  );
};

export default Details; 