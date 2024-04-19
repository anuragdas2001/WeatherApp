import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface WeatherData {
  main?: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  wind?: {
    speed: number;
  };
  visibility?: number;
  weather?: {
    description: string;
    icon: string;
  }[];
}

export const Weather = () => {
  const { cityname } = useParams<{ cityname: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState("celsius"); // Default unit is Celsius

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0de316955c46fcadc8ceaeacfa51fdb4&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [cityname]);

  const convertTemperature = (temp: number, targetUnit: string) => {
    if (targetUnit === "celsius") {
      return temp;
    } else if (targetUnit === "fahrenheit") {
      return (temp * 9) / 5 + 32;
    } else if (targetUnit === "kelvin") {
      return temp + 273.15;
    }
    return temp; // Default to Celsius
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  const currentDate = new Date().toDateString();

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
          <option value="kelvin">Kelvin</option>
        </select>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        {weather && (
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
            <div className="font-bold text-xl">{cityname}</div>
            <div className="text-sm text-gray-500">{currentDate}</div>
            {weather.weather && weather.weather[0] && (
              <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </div>
            )}
            <div className="text-center">
              {weather.weather &&
                weather.weather[0] &&
                weather.weather[0].description}
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl">
                {weather.main &&
                  convertTemperature(weather.main.temp, unit).toFixed(1)}
              </div>
              <div className="flex flex-col items-center ml-6">
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up"></i>
                  </span>
                  <span className="text-sm font-light text-gray-500">
                    High:{" "}
                    {weather.main &&
                      convertTemperature(weather.main.temp_max, unit).toFixed(
                        1
                      )}
                  </span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down"></i>
                  </span>
                  <span className="text-sm font-light text-gray-500">
                    Low:{" "}
                    {weather.main &&
                      convertTemperature(weather.main.temp_min, unit).toFixed(
                        1
                      )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm text-gray-500">
                  {weather.wind && (weather.wind.speed * 3.6).toFixed(1)} km/h
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">
                  {weather.main && weather.main.humidity.toFixed(1)}%
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Visibility</div>
                <div className="text-sm text-gray-500">
                  {weather.visibility && (weather.visibility / 1000).toFixed(1)}{" "}
                  km
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
