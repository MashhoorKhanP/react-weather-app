import { useState } from "react";
import ReactMapboxAutocomplete from "react-mapbox-autocomplete";
import "./geocoder.css";

const Geocoder = ({ setQuery }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSuggestionSelect = (place) => {
    // Extracting only the city name
    const city = place.split(",")[0];
    setSelectedLocation(city);
    if (city !== "") setQuery({ q: city });
    console.log(selectedLocation);
  };
  return (
    <ReactMapboxAutocomplete
      publicKey={import.meta.env.VITE_MAPBOX_TOKEN}
      inputPlaceholder={
        !selectedLocation ? selectedLocation : "Search location"
      }
      onSuggestionSelect={handleSuggestionSelect}
      resetSearchOnChange={false}
      inputClass="search-input"
    />
  );
};

export default Geocoder;
