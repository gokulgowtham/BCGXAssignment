import data from './mockResponses/citiesData.json';
import forecastData from './mockResponses/forecastData.json';
export const getCities = () => {
    return data.cities;
};

export const getForecastDataByCity = (city)=>{
    return forecastData[city];
}