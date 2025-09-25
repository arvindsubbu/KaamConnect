const User = require("../Models/userModel");
const Work = require("../Models/workModel");

const getOrders = async (req, res) => {
  try {
    //console.log("req.userId:", req.userId);
    console.log("req.query:", req.query);
    const user = await User.findById(req.userId).select("-password");
    //console.log('workcontroller',user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { status ,page = 1,limit = 10} = req.query;
    let filter = {};

    if (user.role === "consumer") {
      filter.consumerId = user._id;
    } else if (user.role === "provider") {
      filter.providerId = user._id;
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (status && status !== "all") {
      if(typeof status === 'string' && status.includes(',')){
       filter.status = {$in : status.split(',').map(s => s.trim())};
      } else {
        filter.status = status;
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Work.countDocuments(filter);
    console.log(filter);
    //console.log(total);
    const orders = await Work.find(filter)
      .populate(
        user.role === "consumer" ? "providerId" : "consumerId",
        "name phone email"
      )
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Past orders fetched successfully",
      data: orders,
      pagination : {
        total,
        page : parseInt(page),
        limit : parseInt(limit),
        totalPages : Math.ceil(total/limit),
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getOrders };
