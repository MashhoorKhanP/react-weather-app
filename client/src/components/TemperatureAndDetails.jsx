import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import {
  formatTimeZone,
  formatToLocalTime,
  iconUrlFromCode,
} from "../services/weatherService";

const TemperatureAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    country,
  },
}) => {
  let timezone = formatTimeZone(country);
  return (
    <div>
      <div className="flex items-center justify-center py-3 text-lg text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center space-x-36 justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="icon" className="w-20" />
        <p className="text-4xl">{`${Math.floor(temp)}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{`${Math.floor(
              feels_like
            )}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${Math.floor(
              humidity
            )}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${Math.floor(
              speed
            )} km/h`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center flex-wrap justify-center space-x-1.5 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${Math.floor(temp_max)}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${Math.floor(temp_min)}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureAndDetails;
