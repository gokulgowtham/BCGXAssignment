import data from './mockResponses/citiesData.json';
import forecastData from './mockResponses/forecastData.json';
import stackData from './mockResponses/stackData.json';
export const getCities = () => {
    return data.cities;
};

export const getForecastDataByCity = (city)=>{
    return forecastData[city];
}

export const getValuesForStack = (cityId)=>{
    return stackData[cityId];

}

// export const getStackDetails = ()

