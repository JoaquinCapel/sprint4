const containerWeather = document.getElementById('weather-container');
const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=41.388&lon=2.159&appid=4269bae44568292bdb1a33e9d82270a8';
const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;

const cargarTiempo = async () => {

    try {
        // traemos la respuesta de la API
        const respuesta = await fetch(apiWeatherUrl);
        console.log(respuesta);

        // Comprueba que la respuesta no de ningun error (200)
        if (respuesta.status === 200) {
            // traemos los datos en un archivo/objeto json con todas las propiedades de la API
            const data = await respuesta.json();
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

        } else if (respuesta.status === 401) {
            console.log('Something went wrong. Check your API key');
        } else if (respuesta.status === 404) {
            console.log('Something went wrong. We are working on it');
        }

    } catch (error) {
        console.log(error);
    }
}
cargarTiempo();
