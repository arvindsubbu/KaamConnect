const Provider = require('../Models/providerModel');

// Create new provider
const createProvider = async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json({ success: true, provider });
  } catch (err) {
    console.error("Error creating provider:", err);
    res.status(500).json({ success: false, message: "Failed to create provider" });
  }
};

// Get all providers (basic fetch)
const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate("userId", "name email phone");
    res.status(200).json({ success: true, providers });
  } catch (err) {
    console.error("Error fetching providers:", err);
    res.status(500).json({ success: false, message: "Failed to fetch providers" });
  }
};

// Get provider by ID (for provider profile)
const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate("userId", "name email phone");
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }
    res.status(200).json({ success: true, provider });
  } catch (err) {
    console.error("Error fetching provider:", err);
    res.status(500).json({ success: false, message: "Failed to fetch provider" });
  }
};

// Update provider
const updateProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }
    res.status(200).json({ success: true, provider });
  } catch (err) {
    console.error("Error updating provider:", err);
    res.status(500).json({ success: false, message: "Failed to update provider" });
  }
};

// Delete provider
const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }
    res.status(200).json({ success: true, message: "Provider deleted" });
  } catch (err) {
    console.error("Error deleting provider:", err);
    res.status(500).json({ success: false, message: "Failed to delete provider" });
  }
};

// Find providers by service + location (geo query + sorting)
const searchProviders = async (req, res) => {
  try {
    const { service, lat, lon, maxDistance = 5000, sort = "relevance" } = req.query;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const distance = parseInt(maxDistance);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ success: false, message: "Invalid latitude or longitude" });
    }

    const query = {
      serviceCategory: service,
      "location.coordinates": {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: distance,
        },
      },
    };;

    let sortOption = {};
    if (sort === "rating") {
      sortOption = { averageRating: -1 }; // High → Low
    } else if (sort === "priceLow") {
      sortOption = { pricing: 1 }; // Low → High
    } else if (sort === "priceHigh") {
      sortOption = { pricing: -1 }; // High → Low
    } else if (sort === "experience") {
      sortOption = { yearsOfExperience: -1 }; // Experienced first
    }

    const providers = await Provider.find(query)
      .populate("userId", "name email phone")
      .sort(sortOption);

    res.status(200).json({ success: true, providers });
  } catch (err) {
    console.error("Error searching providers:", err);
    res.status(500).json({ success: false, message: "Failed to search providers" });
  }
};


module.exports = {createProvider,getProviderById,getProviderById,deleteProvider,updateProvider,searchProviders,getProviders}
