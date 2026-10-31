
const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,

  scheduleDate: Date,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["draft", "scheduled", "published"],
    default: "published"
  }

}, { timestamps: true });

module.exports = mongoose.model("Notice", noticeSchema);