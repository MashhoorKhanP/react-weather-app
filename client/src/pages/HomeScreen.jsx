import { toast } from "react-toastify";
import Forecast from "../components/Forecast";
import Inputs from "../components/Inputs";
import TemperatureAndDetails from "../components/TemperatureAndDetails";
import TimeAndLocation from "../components/TimeAndLocation";
import TopButtons from "../components/TopButtons";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "../services/weatherService";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import { useValue } from "../context/ContextProvider";

const HomeScreen = () => {
  const [query, setQuery] = useState({ q: "mumbai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const {
    state: { currentUser },
  } = useValue();

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        if (currentUser) {
          toast.info(
            `Successfully fetched weather for ${data.name}, ${data.country}`
          );
        }
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units, currentUser]);

  const formatedBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };
  return (
    <>
      <Navbar />
      {currentUser ? (
        <div
          className={`mx-auto max-w-screen-md mt-4 pt-10 pb-10 pl-20 pr-20 bg-gradient-to-br shadow-xl ${formatedBackground()}`}
        >
          <TopButtons setQuery={setQuery} selectedCity={query.q} />
          <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
          {weather && (
            <>
              <TimeAndLocation weather={weather} />
              <TemperatureAndDetails weather={weather} />
              <Forecast title={"Hourly Forecast"} items={weather.list} />
              {/* <Forecast title={'Daily Forecast'}/> */}
            </>
          )}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default HomeScreen;
