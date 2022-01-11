import { useState } from "react";

const useGeocoder = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    setValue(event.target.value);
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?bbox=6.7,50.8,7.2,51&limit=3&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching geocoder data , ", error);
    }
  };
  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
  };
};

export default useGeocoder;
