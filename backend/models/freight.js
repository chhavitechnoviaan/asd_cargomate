const mongoose = require("mongoose");

const freightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  origin: String,
  destination: String,

  mode: {
    type: String,
    enum: ["Air", "Sea", "Road"]
  },

  weight: Number,

  cost: Number,

  estimatedTime: String

}, { timestamps: true });

module.exports = mongoose.model("Freight", freightSchema);