import { /**UilSearch,*/ UilLocationPoint } from "@iconscout/react-unicons";
// import { useState } from "react";
import Geocoder from "./Geocoder";
import { toast } from "react-toastify";

const Inputs = ({ setQuery, units, setUnits }) => {
  // const [city, setCity] = useState("");

  // const handleSearchClick = () => {
  //   if (city !== "") setQuery({ q: city });
  // };

  const handleUnitChange = (e) => {
    const selectedUnit = e.target.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fecthing users location");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched successfully");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <Geocoder setQuery={setQuery} />
        {/* <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="text-sm font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        /> */}
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className={`text-white hover:scale-125 transition ease-out ${
            units === "metric" ? "font-medium text-xl" : "font-light"
          }`}
          onClick={handleUnitChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className={`text-white  hover:scale-125 transition ease-out ${
            units === "imperial" ? "font-medium text-xl" : "font-light"
          }`}
          onClick={handleUnitChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
