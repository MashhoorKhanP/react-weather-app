import { formatToLocalTime } from "../services/weatherService";

const TimeAndLocation = ({ weather: { dt, name, timezone, country } }) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-l font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-2xl font-medium">
          {`${name},${country}`}
        </p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
