const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
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
    location : {
      type : String,
      required : true,
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;