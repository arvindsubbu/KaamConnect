import { axiosInstance } from ".";

//add page and limit to params
const searchProvider = async (serviceCategory, lat, lon, maxDistance, sort) => {
  try {
    const res = await axiosInstance.get("/api/providers/search", {
      params: {
        service: serviceCategory,
        lat: Number(lat),
        lon: Number(lon),
        maxDistance: Number(maxDistance),
        sort,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error searching providers:", err);
  }
};

export { searchProvider };
