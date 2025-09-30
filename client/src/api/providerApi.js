import { axiosInstance } from ".";

//add page and limit to params for pagination
const searchProvider = async (serviceCategory, lon, lat, maxDistance, sort) => {
  try {
    const res = await axiosInstance.get("/api/providers/search", {
      params: {
        service: serviceCategory,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        maxDistance: parseInt(maxDistance),
        sort,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error searching providers:", err);
  }
};

export { searchProvider };
