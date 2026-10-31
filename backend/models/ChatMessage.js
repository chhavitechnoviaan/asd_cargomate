const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  message: String,
  response: String,

  context: {
    country: String,
    product: String
  }

}, { timestamps: true });

module.exports = mongoose.model("ChatMessage", chatSchema);