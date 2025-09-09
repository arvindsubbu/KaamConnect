const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceCategory: {
      type: String,
      required: true,
    },
    pricing: {
      type: Number,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    availabilityStatus: {
      type: String,
      enum: ["available", "busy", "on_leave"],
      default: "available",
    },
    location: {
      city: String,
      state: String,
      pincode: String,
      coordinates: {
        type : {
            type : String,
            enum : ['Point'],
            required : true,
            default : 'Point'
        },
        coordinates : {
            type : [Number],
            required : true,
        }
      },
    },
    skills: [String],
    portfolioImages: [String],
    bio: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    completedJobs: {
      type: Number,
      default: 0,
    },
    earnings : {
      type : Number,
      default : 0,
    }
  },
  { timestamps: true }
);

const providerModel = mongoose.model("Provider", providerSchema);
module.exports = providerModel;
