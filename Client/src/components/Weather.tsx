import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Weather = () => {
  const { cityname } = useParams();
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState("celsius"); // Default unit is Celsius
  const [temperature, setTemperature] = useState(null);
  const [maxtemp, setMaxTemp] = useState(null);
  const [mintemp, setMinTemp] = useState(null);
  const [Wind, setWind] = useState(null);
  const [Humidity, setHumidity] = useState(null);
  const [Visibility, setVisibility] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon,setIcon] = useState(null);
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0de316955c46fcadc8ceaeacfa51fdb4`
      );
      setWeather(response.data);

      // console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
    setHumidity(weather.main ? weather.main.humidity : null);
    setWind(weather.wind ? weather.wind.speed : null);
    setVisibility(weather.main ? weather.visibility : null);
    setDescription(weather.weather ? weather.weather[0].description : null);
    setIcon(weather.weather ? weather.weather[0].icon : null);
  }, [cityname, weather]);

  useEffect(() => {
    // Convert temperature when weather data changes or unit changes
    if (weather.main) {
      if (unit === "celsius") {
        setTemperature(((weather.main.temp - 32) * 5) / 9); // Convert from Fahrenheit to Celsius
        setMaxTemp(((weather.main.temp_max - 32) * 5) / 9);
        setMinTemp(((weather.main.temp_min - 32) * 5) / 9);
      } else {
        setTemperature((weather.main.temp * 9) / 5 + 32); // Convert from Celsius  to Fahrenheit
        setMaxTemp((weather.main.temp_max * 9) / 5 + 32);
        setMinTemp((weather.main.temp_min * 9) / 5 + 32);
      }
    }
  }, [weather, unit]);

  const handleUnitChange = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };
  console.log(weather);
  console.log(Humidity);
  const currentDate = new Date().toDateString();
  //   setDate(currentDate);
  console.log(currentDate);
  // console.log(new Date())
  //   setDate(currentDate)
  console.log(icon)
  return (
    <>
      <div className="m-5 flex  justify-center">
        <label htmlFor="unit">Select Unit: </label>
        <select
          className="rounded-lg  ms-5  border-2  border-black"
          id="unit"
          value={unit}
          onChange={handleUnitChange}
        >
          <option value="celsius">Celsius</option>
          <option value="fahrenheit">Fahrenheit</option>
        </select>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
          <div className="font-bold text-xl">{cityname}</div>
          <div className="text-sm text-gray-500">{currentDate}</div>
          <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
            <svg
              className="w-32 h-32"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Embedding the image link */}
              <image
                href={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* The path element you had before */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <div className="text-center">{description}</div>
          <div className="flex flex-row items-center justify-center mt-6">
            <div className="font-medium text-6xl">
              {temperature !== null ? temperature.toFixed(1) : null}
            </div>
            <div className="flex flex-col items-center ml-6">
              <div className="mt-1">
                <span className="text-sm">
                  <i className="far fa-long-arrow-up"></i>
                </span>
                <span className="text-sm font-light text-gray-500">
                  High: {maxtemp !== null ? maxtemp.toFixed(1) : null}
                </span>
              </div>
              <div>
                <span className="text-sm">
                  <i className="far fa-long-arrow-down"></i>
                </span>
                <span className="text-sm font-light text-gray-500">
                  Low: {mintemp !== null ? mintemp.toFixed(1) : null}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-6">
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Wind</div>
              <div className="text-sm text-gray-500">
                {(Wind * 3.6).toFixed(1)}km/h
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Humidity</div>
              <div className="text-sm text-gray-500">{Humidity}%</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Visibility</div>
              <div className="text-sm text-gray-500">{Visibility / 1000}km</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
