"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const containerWeather = document.getElementById('weather-container');
const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=41.388&lon=2.159&appid=4269bae44568292bdb1a33e9d82270a8';
const kelvinToCelsius = (kelvin) => kelvin - 273.15;
const cargarTiempo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuesta = yield fetch(apiWeatherUrl);
        console.log(respuesta);
        if (respuesta.status === 200) {
            const data = yield respuesta.json();
            const celsiusTemperature = kelvinToCelsius(data.main.temp);
            const iconoClima = data.weather[0].icon;
            const iconoURL = `https://openweathermap.org/img/w/${iconoClima}.png`;
            console.log(data);
            if (containerWeather) {
                let clima = `
                <img src="${iconoURL}"><b>
                ${data.weather[0].main}: </b>
                ${data.weather[0].description} | <b>
                ${celsiusTemperature.toFixed(0)}°C | 
                ${data.name}</b>
                 `;
                containerWeather.innerHTML = clima;
            }
        }
        else if (respuesta.status === 401) {
            console.log('Something went wrong. Check your API key');
        }
        else if (respuesta.status === 404) {
            console.log('Something went wrong. We are working on it');
        }
    }
    catch (error) {
        console.log(error);
    }
});
cargarTiempo();
//# sourceMappingURL=weather.js.map