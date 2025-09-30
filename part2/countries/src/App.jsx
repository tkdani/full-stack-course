import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [searchedCountry, setSearchedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [fileteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchedCountry.toLowerCase());
    });

    setFilteredCountries(filtered);
  }, [searchedCountry]);

  const handleOnChange = (event) => {
    setSearchedCountry(event.target.value);
  };
  const handleShow = (country) => {
    setSearchedCountry(country);
  };
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const getWeather = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((weather) => {
        return (
          <div>
            <p>Temperature: {weather.data.main.temp}°C</p>
            <p>Wind: {weather.data.wind.speed} m/s</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
            />
          </div>
        );
      })
      .catch(console.log("error :)"));
  };
  const setContent = () => {
    if (fileteredCountries.length > 10) {
      return <p>Too many matches</p>;
    } else if (fileteredCountries.length > 1) {
      return (
        <div>
          {fileteredCountries.map((country) => {
            return (
              <p key={country.ccn3}>
                {country.name.common}
                <button onClick={() => handleShow(country.name.common)}>
                  show
                </button>
              </p>
            );
          })}
        </div>
      );
    } else if (fileteredCountries.length == 1) {
      return (
        <div>
          <h2>{fileteredCountries[0].name.common}</h2>
          <p>{fileteredCountries[0].capital[0]}</p>
          <p>area {fileteredCountries[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(fileteredCountries[0].languages).map(
              (lang, index) => {
                return <li key={index}>{lang}</li>;
              }
            )}
          </ul>
          <img src={fileteredCountries[0].flags["png"]} />
          <h2>Weather for {fileteredCountries[0].name.common}</h2>
          {getWeather(fileteredCountries[0].name.common)}
        </div>
      );
    } else if (fileteredCountries.length == 0 && searchedCountry != "")
      return <p>no country</p>;
  };

  return (
    <div>
      <p>
        find countries
        <input onChange={handleOnChange} />
      </p>
      {setContent()}
    </div>
  );
};

export default App;
