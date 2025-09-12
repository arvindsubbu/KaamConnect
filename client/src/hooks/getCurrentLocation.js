import { slugify } from "../utils/slugify";

export const getCurrentLocation = async (setSelectedLocation, setIsModalOpen, navigate, service) => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/reverse.php?key=pk.9d58d41767692caa4dc79a7396b1fe6a&lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        // Pick city or fallback to display_name
        const locName = data.address?.city || data.address?.state || data.display_name;

        const cleanLoc = slugify(locName);

        setSelectedLocation(cleanLoc);
        setIsModalOpen(false);

        // If a service is already selected, navigate to combined route
        if (service) {
          navigate(`/service/${cleanLoc}/${service}`);
        } else {
          navigate(`/service/${cleanLoc}`);
        }
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to fetch your current location");
    }
  );
};
