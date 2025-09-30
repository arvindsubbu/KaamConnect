const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      reqired: true,
      unique: true,
      match: /^\d{10}$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["consumer", "provider"],
      required: true,
    },
    location: {
      name : String,
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
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
