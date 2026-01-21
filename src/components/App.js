import React, { useState, useEffect } from "react";
import "./../styles/App.css";
import "regenerator-runtime/runtime";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  function kelvinToFahrenheit(kelvin) {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  }

  function handleChange(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const API_KEY = "e467712b257e418838be97cc881a71de";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    (async function () {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
        setCity("");
      } catch (err) {
        console.error(err);
      }
    })();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Weather App</h1>
        <input
          className="search"
          onChange={handleChange}
          value={city}
          placeholder="Enter a city"
        />
        {weather && (
          <div className="weather">
            <h1>{weather.name}</h1>
            <h2>{kelvinToFahrenheit(weather.main.temp)} °F</h2>
            <p>{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
