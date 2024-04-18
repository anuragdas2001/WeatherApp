import  { useState, useEffect } from "react";
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
  const [weather, setWeather] = useState<WeatherData>({});
  const [unit, setUnit] = useState("celsius"); // Default unit is Celsius
  const [temperature, setTemperature] = useState<number | null>(null);
  const [maxtemp, setMaxTemp] = useState<number | null>(null);
  const [mintemp, setMinTemp] = useState<number | null>(null);
  const [Wind, setWind] = useState<number | null>(null);
  const [Humidity, setHumidity] = useState<number | null>(null);
  const [Visibility, setVisibility] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0de316955c46fcadc8ceaeacfa51fdb4`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [cityname]);

  useEffect(() => {
    if (weather.main) {
      setHumidity(weather.main.humidity);
      setWind(weather.wind ? weather.wind.speed : null);
      setVisibility(weather.visibility || null);
      setDescription(weather.weather ? weather.weather[0].description : null);
      setIcon(weather.weather ? weather.weather[0].icon : null);

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
        </select>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
          <div className="font-bold text-xl">{cityname}</div>
          <div className="text-sm text-gray-500">{currentDate}</div>
          {icon && (
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather icon"
              />
            </div>
          )}
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
                {Wind !== null ? (Wind * 3.6).toFixed(1) : null}km/h
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Humidity</div>
              <div className="text-sm text-gray-500">
                {Humidity !== null ? Humidity.toFixed(1) : null}%
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Visibility</div>
              <div className="text-sm text-gray-500">
                {Visibility !== null ? (Visibility / 1000).toFixed(1) : null}km
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
