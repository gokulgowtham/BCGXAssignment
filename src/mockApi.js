import data from "./mockResponses/citiesData.json";
import forecastData from "./mockResponses/forecastData.json";
import stackData from "./mockResponses/stackData.json";
import backlogStackData from "./mockResponses/backlogStackData.json";
import consumptionData from "./mockResponses/consumptionData.json";
import finalForecastData from "./mockResponses/finalForecastData.json";
import aiForecastData from "./mockResponses/aiForecastData.json";
import previousFinalForecastData from "./mockResponses/previousFinalForecastData.json";

export const getCities = () => {
  return data.cities;
};

export const getForecastDataByCity = (city) => {
  return forecastData[city];
};

export const getValuesForStack = (cityId) => {
  return stackData[cityId];
};

export const getStackDetails = (tabValue) => {
  return backlogStackData;
};

const formulateData = (
  consumptionData,
  finalForecastHistoricalData,
  finalForecastData,
  aiForecastData,
  aiForecastDataHistorical,
  previousQtrFinalForecast
) => {
  return {
    consumptionData,
    finalForecastHistoricalData,
    finalForecastData,
    aiForecastData,
    aiForecastDataHistorical,
    previousQtrFinalForecast
  };
};

export const getPlotValues = (selectedStackId) => {
  // const stackValues = getValuesForStack(selectedStackId);
  const plotValues = formulateData(
    consumptionData[selectedStackId],
    finalForecastData[selectedStackId]?.finalForecastHistorical,
    finalForecastData[selectedStackId]?.finalForecast,
    aiForecastData[selectedStackId]?.aiForecast,
    aiForecastData[selectedStackId]?.aiForecastHistorical,
    previousFinalForecastData[selectedStackId]?.previousQtrFinalForecast
  );
  return plotValues;
};
