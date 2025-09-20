const User = require("../Models/userModel");
const Work = require("../Models/workModel");

const getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { status } = req.query;
    let filter = {};

    if (user.role === "consumer") {
      filter.consumerId = user._id;
    } else if (user.role === "provider") {
      filter.providerId = user._id;
    } else {
      return res.status(400).json({ succes: false, message: "Invalid role" });
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    const orders = await Work.find(filter)
      .populate(
        user.role === "consumer" ? "providerId" : "consumerId",
        "name phone email"
      )
      .sort({ updated: -1 });

    res.status(200).json({
      success: true,
      message: "Past orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getOrders };
