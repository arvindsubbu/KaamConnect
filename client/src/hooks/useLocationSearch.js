import { useState, useEffect } from "react";


export default function useLocationSearch() {

  const [locationSearch, setLocationSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!locationSearch) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/autocomplete.php?key=pk.9d58d41767692caa4dc79a7396b1fe6a&q=${encodeURIComponent(
            locationSearch
          )}&countrycodes=IN&limit=6&normalizecity=1`
        );
        const data = await res.json();

        setSuggestions(
          data.map((place) => ({
            name: place.display_name,
            lat: place.lat,
            lon: place.lon,
          }))
        );
      } catch (err) {
        console.error("LocationIQ error:", err);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [locationSearch]);

  return { locationSearch, setLocationSearch, suggestions, setSuggestions };
}
