const User = require("../Models/userModel");
const Work = require("../Models/workModel");

const getPastOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let pastOrders;

    if (user.role === "consumer") {
      // consumer’s past orders
      pastOrders = await Work.find({
        consumerId: user._id,
        status: "completed",
      })
        .populate("providerId", "name phone email") // show provider info
        .sort({ completedAt: -1 });
    } else if (user.role === "provider") {
      // provider’s past jobs
      pastOrders = await Work.find({
        providerId: user._id,
        status: "completed",
      })
        .populate("consumerId", "name phone email") // show consumer info
        .sort({ completedAt: -1 });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    res.status(200).json({
      success: true,
      message: "Past orders fetched successfully",
      data: pastOrders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getPastOrders };
